#! /bin/bash

echo ${var:-"var is not defined"}
var="helloworld"
echo ${var:+"var is defined"}
unset var
echo ${var:="var is defined again"}
unset var
echo ${var?="var error"}