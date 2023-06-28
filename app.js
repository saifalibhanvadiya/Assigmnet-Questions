// 1. Make a api for phone number login
app.post("/customer/", async (request, response) => {
    const customer = request.body;
    const {name.email} = customer;

    const getCustomerName = `SELECT *  FROM customer WHERE name = ${name}`;
    if(getCustomerName){
           response.status(400)
           response.send('Customer Already exists')
    }
    else{
           const customerInsert = `INSERT INTO customer(name,email) VALUES('${name}','${email}' )`
           const customer = await db.run(customerInsert)
            response.send(customer);
    }
});

// 2. Refer to the tables below, Write a sql query for finding the subjects for each
// student, the subjects should be order by alphabetically .

`SELECT S.customerId, S.name ,GROUP_CONCAT(subjects.subjectName ORDER BY subjects.subjectName ASC SEPARATOR ', ') AS subjects
  FROM (customers ON subject_student_mapping inner
 join customers.customerId = subject_student_mapping.customerId)
  as S ON subjects inner join S.subjectId = subjects.subjectId 
  GROUP BY S.name 
  ORDER BY S.name ASC `


// 3. Write a function in node that inserts the following data in mysql , the email should
// be unique and if the email already exists in the system then the name of the customer
// will be updated with the new name that is there in the array for that customer.  

const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'your_database_host',
  user: 'your_username',
  password: 'your_password',
  database: 'your_database_name'
});
function insertOrUpdateCustomerData(customers) {
  customers.forEach((customer) => {
    const { email, name } = customer;

    // Check if the email already exists in the system
    const selectQuery = 'SELECT * FROM customers WHERE email = ?';
    connection.query(selectQuery, [email], (error, results) => {
      if (error) {
        console.error('Error selecting customer:', error);
      } else {
        if (results.length > 0) {
          // Email already exists, update the name for the existing customer
          const updateQuery = 'UPDATE customers SET name = ? WHERE email = ?';
          connection.query(updateQuery, [name, email], (error) => {
            if (error) {
              console.error('Error updating customer:', error);
            } else {
              console.log(`Customer with email ${email} already exists. Name updated to ${name}.`);
            }
          });
        } else {
          // Email does not exist, insert a new customer
          const insertQuery = 'INSERT INTO customers (email, name) VALUES (?, ?)';
          connection.query(insertQuery, [email, name], (error) => {
            if (error) {
              console.error('Error inserting customer:', error);
            } else {
              console.log(`New customer inserted: ${name} (${email}).`);
            }
          });
        }
      }
    });
  });
}

insertOrUpdateCustomerData(customersData);

// 4. Create a new object which have all the properties of object person and student

const person = {
id : 2 ,
gender : 'mail'
};
const student = {

name : "ravi" ,
email :"ravi11@yopmail.com"
};

const combinePersonStudent = {
  ...person,
  ...student
};
console.log(combinePersonStudent);

// 5. Make a promisifed function for the functioan having callback below , after the
// function is promisifed then call the function like you call a promise

const request = require('request');
const util = require('util');

const getGoogleHomePage = () => {
  return new Promise((resolve, reject) => {
    request('http://www.google.com', (error, response, body) => {
      if (error) {
        console.error('Error:', error);
        reject(error);
      } else {
        console.log('Status Code:', response && response.statusCode);
        console.log('Body:', body);
        resolve(body);
      }
    });
  });
};
const asyncGetGoogleHomePage = util.promisify(getGoogleHomePage);

asyncGetGoogleHomePage()
  .then((body) => {
    console.log('RESULT ==>', body);
  })
  .catch((error) => {
    console.error('Error:', error);
  });

// 6. Imagine you have array of integer from 1 to 100 , the numbers are randomly ordered
// , one number from 1 to 100 is missing , Please write the code for finding the missing
// number

function findMissingNumber(arr) {
  const expectedSum = (100 * (100 + 1)) / 2; 
  const arraySum = arr.reduce((sum, num) => sum + num, 0);
  const missingNumber = expectedSum - arraySum;
  return missingNumber;
}

// Generate an array of integers from 1 to 100 with a missing number
const numbersArray = Array.from({ length: 100 }, (_, i) => i + 1);

numbersArray.splice(77, 1); // Remove the number 78 from the array

// Find the missing number
const missingNumber = findMissingNumber(numbersArray);
console.log('Missing Number:', missingNumber);
