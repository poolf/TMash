#!/usr/bin/expect -f
set USER root
set IP 192.168.1.22
set PATH /usr/local/test
set PASSWORD 123.com
exec rm -f dist.zip
exec zip -q -r dist.zip dist/

#*****************************#

#upload zip package to server
spawn scp dist.zip  $USER@$IP:$PATH
expect "*password:"
send "$PASSWORD\r"
send_user "upload successfully!\r"
send "exit\r"
expect eof

#*****************************#

#ssh login server and unzip package
spawn ssh $USER@$IP
expect "password:"
send "$PASSWORD\r"
expect "*#"
send "cd $PATH\r"
send "rm -rf dist\r"
send "unzip dist.zip\r"
send_user "deployed successfully!\r"
send "exit\r"
expect eof