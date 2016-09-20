Recommended tools:

1. Sublime Text editor
2. Chrome

Sample test output:

4 Jul 22:21:13 - api service url = [http://localhost:3000/explorer]
..>>>>>>>>>>>>>> calling /api/Messages/count with an HTTP GET ...
4 Jul 22:21:13 - current message count is 53
4 Jul 22:21:13 - in putCount !!!!!!!!!!!!!!!!!!!!!!!!! >>>>>>> done:
4 Jul 22:21:13 - [Function]
>>>>>>>>>>>>>> calling /api/Messages with an HTTP PUT ...
>>>>>>>>>>>>>> calling /api/Flags with an HTTP GET ...
>>>>>>>>>>>>>> calling /api/Flags with an HTTP PUT ...
F>>>>>>>>>>>>>> calling /api/Messages/id with an HTTP GET ...
4 Jul 22:21:34 - message by id 54 is = {"id":54,"subject":"Message by Test User
1","text":"t1","createdat":"2016-04-05T00:00:00.000Z","updatedat":"2016-04-05T00
:00:00.000Z","state":"false","type":"topic173-owner","owner":-1,"likecount":0}
4 Jul 22:21:34 - in printCount !!!!!!!!!!!!!!!!!!!!!!!!! >>>>>>> done:
4 Jul 22:21:34 - [Function]
F>>>>>>>>>>>>>> calling /api/Users/login with an HTTP POST ...
4 Jul 22:21:55 - user authentication = {"status":"{\"flag\": \"ok\", \"userId\":
 \"user1@gmail.com\", \"token\": \"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3Mi
OiJ1c2VyMUBnbWFpbC5jb20iLCJyb2xlIjoidXNlciIsImV4cCI6MTQ3NTQ3MjExNTY3N30.o-uazjnJ
Y16MKRY23GLDbNqSvqev96gUgqm5uMNDb0I\", \"user\": {\"session_token\":\"eyJ0eXAiOi
JKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjMsInVzZXJfaWQiOjMsImVtYWlsIjoidXNlcjFAZ21ha
WwuY29tIiwiZm9yZXZlciI6ZmFsc2UsImlzcyI6Imh0dHBzOlwvXC9kZi1zdGVtMi5lbnRlcnByaXNlL
mRyZWFtZmFjdG9yeS5jb21cL2FwaVwvdjJcL3VzZXJcL3Nlc3Npb24iLCJpYXQiOjE0Njc2OTI1MTksI
mV4cCI6MTQ2NzY5NjExOSwibmJmIjoxNDY3NjkyNTE5LCJqdGkiOiI4ODU1YjJhMjNlYTRmZjljZGNiO
WQyZDgyNDZkYTYzZSJ9.iDW_d5TZpFm9RR3ldTwCNwMiM-DbzfjwShFwR9KsOvM\",\"session_id\"
:\"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjMsInVzZXJfaWQiOjMsImVtYWlsIjoi
dXNlcjFAZ21haWwuY29tIiwiZm9yZXZlciI6ZmFsc2UsImlzcyI6Imh0dHBzOlwvXC9kZi1zdGVtMi5l
bnRlcnByaXNlLmRyZWFtZmFjdG9yeS5jb21cL2FwaVwvdjJcL3VzZXJcL3Nlc3Npb24iLCJpYXQiOjE0
Njc2OTI1MTksImV4cCI6MTQ2NzY5NjExOSwibmJmIjoxNDY3NjkyNTE5LCJqdGkiOiI4ODU1YjJhMjNl
YTRmZjljZGNiOWQyZDgyNDZkYTYzZSJ9.iDW_d5TZpFm9RR3ldTwCNwMiM-DbzfjwShFwR9KsOvM\",\
"id\":3,\"name\":\"u1\",\"first_name\":\"u\",\"last_name\":\"1\",\"email\":\"use
r1@gmail.com\",\"is_sys_admin\":false,\"last_login_date\":\"2016-07-05 04:21:59\
",\"host\":\"enterprise-console\"}}"}
4 Jul 22:21:55 - in authenticated !!!!!!!!!!!!!!!!!!!!!!!!! >>>>>>> done:
4 Jul 22:21:55 - [Function]
F>>>>>>>>>>>>>> calling /api/Threads/wall with an HTTP GET ...
4 Jul 22:22:16 - wall = {"wall":[{"id":208,"subject":"Message by U 2","text":"t1
","createdat":"2016-04-05T00:00:00.000Z","updatedat":"2016-04-05T00:00:00.000Z",
"state":"true","type":"topic183-owner","owner":-1,"likecount":1,"threadid":183},
{"id":209,"subject":"Message by U 2","text":"c1.1","createdat":"2016-04-05T00:00
:00.000Z","updatedat":"2016-04-05T00:00:00.000Z","state":"false","type":"topic18
3","owner":-1,"likecount":0,"threadid":183},{"id":214,"subject":"Message by U 2"
,"text":"c1.2","createdat":"2016-04-05T00:00:00.000Z","updatedat":"2016-04-05T00
:00:00.000Z","state":"false","type":"topic183","owner":-1,"likecount":0,"threadi
d":183},{"id":210,"subject":"Message by U 2","text":"t2","createdat":"2016-04-05
T00:00:00.000Z","updatedat":"2016-04-05T00:00:00.000Z","state":"false","type":"t
opic185-owner","owner":-1,"likecount":0,"threadid":185},{"id":211,"subject":"Mes
sage by U 2","text":"c2.1","createdat":"2016-04-05T00:00:00.000Z","updatedat":"2
016-04-05T00:00:00.000Z","state":"false","type":"topic185","owner":-1,"likecount
":0,"threadid":185},{"id":212,"subject":"Message by U 2","text":"t3","createdat"
:"2016-04-05T00:00:00.000Z","updatedat":"2016-04-05T00:00:00.000Z","state":"fals
e","type":"topic187-owner","owner":-1,"likecount":0,"threadid":187},{"id":213,"s
ubject":"Message by U 2","text":"t4","createdat":"2016-04-05T00:00:00.000Z","upd
atedat":"2016-04-05T00:00:00.000Z","state":"false","type":"topic188-owner","owne
r":-1,"likecount":0,"threadid":188},{"id":215,"subject":"Message by U 2","text":
"t3","createdat":"2016-04-05T00:00:00.000Z","updatedat":"2016-04-05T00:00:00.000
Z","state":"false","type":"topic191-owner","owner":-1,"likecount":0,"threadid":1
91}]}
4 Jul 22:22:16 - in wallLoaded !!!!!!!!!!!!!!!!!!!!!!!!! >>>>>>> done:
4 Jul 22:22:16 - [Function]

Reference:

http://npm.im/swagger-client