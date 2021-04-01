import Express from "express";
import mysql from "mysql";

const app = Express();
const port = process.env.PORT || 3000;

// SQL 
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password"
});
  
con.connect(function(err) {
if (err) throw err;
console.log("Connected!");    
});

// API RES
app.get(`/first_name=:fname&last_name=:lname`, (req, res) => {
    const fname = req.params.fname;
    const lname = req.params.lname;
    console.log(`Query: ${fname} ${lname}`)
    con.query("USE employees", function (err, result) {
        if (err) throw err;
      });
    con.query(`SELECT emp_no, first_name, last_name, title, salary FROM paydata WHERE first_name = ? AND last_name = ? ORDER BY from_date DESC LIMIT 1`, [fname, lname],  function (err, result) {
        if (err) throw err;
        res.json(result);
        console.log("Complete")
      });

})
app.get(`/id=:id`, (req, res) => {
    const id = req.params.id;
    console.log(`Query: ${id}`)
    con.query("USE employees", function (err, result) {
        if (err) throw err;
      });
    con.query(`SELECT emp_no, first_name, last_name, title, salary FROM paydata WHERE emp_no = ? ORDER BY from_date DESC LIMIT 1`, [id],  function (err, result) {
        if (err) throw err;
        res.json(result);
        console.log("Complete")
      });

})

app.listen(port, () => console.log(`Listening on port: ${port}`));
