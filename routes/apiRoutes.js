
const noteData = require("../db/db.json");
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');


module.exports = function(app) {

    app.get("/api/notes", function (req, res) {
        console.log("GET");
        res.json(noteData);
    });
    app.post("/api/notes", function (req, res) {
        if (noteData) {
            req.body.id=uuidv4(); // adding unique id
            noteData.push(req.body);
            fs.writeFile("db/db.json", JSON.stringify(noteData, '/t'), err => {
                if (err) throw err;
             
             res.json(true);
            });
        }
    });

    app.get("/api/notes/:id", function(req, res) {
        res.json(noteData[req.params.id]);
    });

   
   app.delete("/api/notes/:id", function(req, res) {
       console.log(req.params.id);
        //locate id
       for (var i = 0; i < noteData.length; i++) {
        if (req.params.id === noteData[i].id) {
            //toss it out
            noteData.splice(i, 1);
            console.log(noteData)
          
        }
      }
       //3. toss it out when I find the id
       //4. update my nodeData
       fs.writeFile("db/db.json", JSON.stringify(noteData, '/t'), err => {
        if (err) throw err;
     
     res.json(true);
    });
});
};