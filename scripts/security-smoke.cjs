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
const qs = require('qs');
const lodash = require('lodash');
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
    assert.match(created.createTweet.id, /^tweet-[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
    const another = await query('mutation($user:String!){createTweet(userId:$user,body:"Second fixture"){id body}}', {user:initial.currentUser.id});
    assert.notEqual(another.createTweet.id, created.createTweet.id);
    assert.ok((await query('{tweets{id body}}')).tweets.some(t=>t.id===created.createTweet.id));
    const favorite = await query('mutation($tweet:String!,$user:String!){createFavorite(tweetId:$tweet,userId:$user){id tweet{id} user{id}}}', {tweet:created.createTweet.id,user:initial.currentUser.id});
    assert.equal(favorite.createFavorite.tweet.id, created.createTweet.id);
    assert.equal(favorite.createFavorite.user.id, initial.currentUser.id);
    const removed = await query('mutation($tweet:String!,$user:String!){deleteFavorite(tweetId:$tweet,userId:$user){id}}', {tweet:created.createTweet.id,user:initial.currentUser.id});
    assert.equal(removed.deleteFavorite.id, favorite.createFavorite.id);
    const trust = proxyaddr.compile(['127.0.0.0/8']);
    assert.equal(trust('::ffff:10.0.0.1'), false);
    assert.equal(trust('::ffff:127.0.0.1'), true);
    assert.throws(() => quote.quote([{op:'x\necho fixture'}]), /invalid.*op/);
    assert.deepEqual(qs.parse('a[b]=fixture&list[0]=one&list[1]=two'), {a:{b:'fixture'},list:['one','two']});
    assert.equal(qs.stringify({a:{b:'fixture'}}), 'a%5Bb%5D=fixture');
    assert.deepEqual(lodash.groupBy([{kind:'one'},{kind:'two'},{kind:'one'}], 'kind').one.length, 2);
    assert.equal(lodash.get(lodash.merge({}, {a:{b:'fixture'}}), 'a.b'), 'fixture');
    console.log('PASS real GraphQL HTTP query/create/read using scratch JSON database; proxy subnet and shell newline checks');
  } finally {
    if (apollo) await apollo.stop();
    if (http.listening) await new Promise(resolve=>http.close(resolve));
    fs.rmSync(dir, {recursive:true, force:true});
  }
})().catch(error=>{console.error(error);process.exitCode=1;});
