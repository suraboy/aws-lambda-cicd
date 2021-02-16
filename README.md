Aws : Lambda CICD
======

NOTE
----
poc aws lambda by serverless 

Application flow pattern:
---------------------
https://github.com/suraboy/aws-lambda-cicd

Run the docker for development:
---------------------
First you need to install serverless and aws-cli for setup environment of appplication

Test serverless
```bash
sls print
```

Installing Dependencies
------------------------------------
Run the composer installer:

```bash
npm install
```
or
```bash
npm update
```

Setup credential aws access key
------------------------------------
```bash
aws configure
```

Deploy Development
------------------------------------
```bash
sls deploy --env development --state development
```

