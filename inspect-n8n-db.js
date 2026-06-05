const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.join(process.env.USERPROFILE, '.n8n', 'database.sqlite');
console.log('DB path:', dbPath);
const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY, (err) => {
  if (err) {
    console.error('Open error:', err.message);
    process.exit(1);
  }
});

function query(sql) {
  return new Promise((resolve, reject) => {
    db.all(sql, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

(async () => {
  try {
    const tables = await query("SELECT name, sql FROM sqlite_master WHERE type='table' ORDER BY name");
    console.log('TABLES:');
    tables.forEach((t) => console.log('-', t.name));

    const getColumns = async (table) => {
      const cols = await query(`PRAGMA table_info(${table})`);
      console.log(`\nCOLUMNS for ${table}:`);
      cols.forEach((c) => console.log(`  ${c.cid}: ${c.name} (${c.type})`));
    };

    await getColumns('workflow_entity');
    await getColumns('shared_workflow');
    await getColumns('project');
    await getColumns('user');
    await getColumns('workflow_history');
    await getColumns('workflow_published_version');
    await getColumns('workflow_publish_history');

    const workflows = await query('SELECT id, name, active, parentFolderId, meta, versionCounter, activeVersionId, createdAt, updatedAt FROM workflow_entity');
    console.log('\nWORKFLOWS:', JSON.stringify(workflows, null, 2));

    const shared = await query('SELECT * FROM shared_workflow');
    console.log('\nSHARED_WORKFLOWS:', JSON.stringify(shared, null, 2));

    const projects = await query('SELECT id, name, type, creatorId FROM project');
    console.log('\nPROJECTS:', JSON.stringify(projects, null, 2));

    const relations = await query('SELECT * FROM project_relation');
    console.log('\nPROJECT_RELATIONS:', JSON.stringify(relations, null, 2));

    const histories = await query('SELECT id, workflowId, versionId, createdAt FROM workflow_history');
    console.log('\nWORKFLOW_HISTORY:', JSON.stringify(histories, null, 2));

    const published = await query('SELECT id, workflowId, versionId, createdAt FROM workflow_published_version');
    console.log('\nWORKFLOW_PUBLISHED_VERSION:', JSON.stringify(published, null, 2));

    const publishHistory = await query('SELECT id, workflowId, versionId, createdAt FROM workflow_publish_history');
    console.log('\nWORKFLOW_PUBLISH_HISTORY:', JSON.stringify(publishHistory, null, 2));

    const users = await query('SELECT id, email, firstName, lastName, roleSlug FROM user');
    console.log('\nUSERS sample:', JSON.stringify(users.slice(0, 20), null, 2));
  } catch (err) {
    console.error('Query error:', err.message);
  } finally {
    db.close();
  }
})();
