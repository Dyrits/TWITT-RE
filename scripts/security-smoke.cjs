const fs = require('fs');
const path = require('path');
const os = require('os');
const assert = require('assert/strict');
const root = path.resolve(__dirname, '..');
process.chdir(path.join(root, 'server'));
const express = require('express');
const {createServer} = require('http');
const Db = require('../server/dist/db.js').default;
const {seedDb} = require('../server/dist/seed.js');
const {createApolloServer} = require('../server/dist/apollo-server.js');
const proxyaddr = require('proxy-addr');
const quote = require('shell-quote');
(async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'twitt-security-'));
  const app = express();
  const http = createServer(app);
  let apollo;
  try {
    const db = new Db(path.join(dir, 'db.json'));
    await db.initDefaults();
    await seedDb(db);
    apollo = await createApolloServer(db, http, app);
    await new Promise(resolve => http.listen(0, '127.0.0.1', resolve));
    const url = `http://127.0.0.1:${http.address().port}/graphql`;
    const query = async (query, variables) => {
      const r = await fetch(url, {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({query, variables})});
      const j = await r.json();assert.equal(r.status, 200);assert.equal(j.errors, undefined, JSON.stringify(j.errors));return j.data;
    };
    const initial = await query('{currentUser{id name} tweets{id body}}');
    assert.ok(initial.currentUser.id);assert.ok(initial.tweets.length);
    const created = await query('mutation($user:String!){createTweet(userId:$user,body:"Fixture security smoke"){id body}}', {user:initial.currentUser.id});
    assert.equal(created.createTweet.body, 'Fixture security smoke');
    assert.ok((await query('{tweets{id body}}')).tweets.some(t=>t.id===created.createTweet.id));
    const trust = proxyaddr.compile(['127.0.0.0/8']);
    assert.equal(trust('::ffff:10.0.0.1'), false);
    assert.equal(trust('::ffff:127.0.0.1'), true);
    assert.throws(() => quote.quote([{op:'x\necho fixture'}]), /invalid.*op/);
    console.log('PASS real GraphQL HTTP query/create/read using scratch JSON database; proxy subnet and shell newline checks');
  } finally {
    if (apollo) await apollo.stop();
    if (http.listening) await new Promise(resolve=>http.close(resolve));
    fs.rmSync(dir, {recursive:true, force:true});
  }
})().catch(error=>{console.error(error);process.exitCode=1;});
