import express from 'express';
import setupDB from './SetupDB/setupDB';
import DBUtil from './util/DBUtil';
import cors from 'cors';

const main = async function() {

  await setupDB();
  await DBUtil.connect('f5poolmembers');
  await DBUtil.connect('foremanservers');

  const app = express();
  const port = 3001;

  app.use(cors());
  app.use(express.static('static'))
  app.get('/api/v1/compliance', async function (request, response) {
    const db = DBUtil.getDb('f5poolmembers');
    if (!db) throw 'Database not found';
    const result = await db.find({
      limit: 5000,
      "selector": {
        "_id": {
          "$gt": null
        },
        "lastChecked": {
          "$gt": (Date.now() - 100000000),
        },
        "$or": [
          {
            "daysDown": {
              "$gt": 0
            }
          },
          {
            "daysWithoutConnections": {
              "$gt": 0
            }
          },
          {
            "daysWithoutData": {
              "$gt": 0
            }
          },
          {
            "daysWithoutRequests": {
              "$gt": 0
            }
          },
        ]
      }
    })
    response.json(result)
  })

  app.listen(port, () => console.log(`Origin backend listening on http://localhost:${port}`))
}

main();
