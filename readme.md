# Preofo Server

  

## Description

`Preofo` server is a Node.js server to handle the requests of a food pre-order application that is developed using React Native.

  

## APIs

`GET` `/` : root

  

#### OTP Endpoints :

 ### 1. `GET` `/otp/send`  : 
 
 This API sends an OTP to the requested Phone Number and also strores the same OTP in the Database.

##### Params Required :

* `phoneNumber` -> number to which the otp has to be sent.

* `serverKey` -> Key to access server.

* `clientType` -> "USER" OR "PARTNER" depending on who is sending the request.

##### Possible Responses : (JSON)

 ```
 { code: "SUCCESS" } && status(200) 
 // Signifies that OTP is sent successfully.
 ```

 ```
 { code: "INVALID_SERVER_KEY" } && status(400) 
 // `serverKey` does not match.
 ```

 ```
{ code: "USER_EXISTS" } && status(401)
 // Signifies User already exists in the database
 ```


### 2. `GET` `/otp/validate`  : 

This API compares the otp in the request params with the one saved in the database when the request is sent at '/otp/send' with the phone number.

##### Params Required :

`phoneNumber` -> number for which the otp has to be checked.

`otp` -> OTP from request params.

##### Possible Responses : (JSON)

 ```
{ code: "SUCCESS", userToken } && status(200)
// Signifies that OTP matches and the userToken contains freshly generated token containing users phoneNumber.This token is required for the proper authentication of the user.
 ```

 ```
{ code: "INVALID_OTP" } && status(400) 
// Request params otp does not match with the otp in the database
 ```

 ```
{ code: "OTP_EXPIRED" } && status(401)
// The otp entered is expired.
 ```


#### User Endpoints :
 
`/partner` : partner

`/user` : user

`/restaurant` : restaurant