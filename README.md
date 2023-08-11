# aws_s3_cloudFront
CloudFront Signed URLs with Node.js

In this you have to create your private key using openssl and then from your private key you have to create your 
public key

To create private key ---
openssl genrsa -out private_key.pem 2048

To create public key ---
openssl rsa -pubout -in private_key.pem -out public_key.pem
