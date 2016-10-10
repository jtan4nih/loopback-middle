heroku addons:create cleardb:ignite
Creating cleardb:ignite on boiling-castle-15512... free
Created cleardb-concentric-30575 as CLEARDB_DATABASE_URL
Use heroku addons:docs cleardb to view documentation

heroku config
heroku-cli: Installing CLI... 17.56MB/17.56MB
=== serene-thicket-13083 Config Vars
CLEARDB_DATABASE_URL: 

heroku config:set DATABASE_URL=''

heroku addons:remove cleardb
