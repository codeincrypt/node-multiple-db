# node-micro-service

1) Create a NodeJs ExpressJs project.
2) There should be separate files for Route, MiddleWare, Config functions
3) Create three Databases master, child1 & child2 all contains
   Master DB Table name customer -> fields -> customer_Id,customer_Name,customer_Mobile,customer_Email,customer_Password,database_Id
   Child DB Table name customer_address -> fields -> customer_address_Id,customer_address_House,customer_address_Street,customer_address_City
4) Insert any 2 data in customer
5) Fetch Login data using post api
request ->  customer_Mobile,customer_Password
response -> customer_Id,customer_Name,database_Id
6) Fetch Address data using post api
request ->  customer_Id,database_Id
response -> customer_address_House,customer_address_Street,customer_address_City