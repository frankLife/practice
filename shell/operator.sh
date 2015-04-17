#! /bin/bash

val=`expr 2 + 2 `
echo "result is $val"
val=`expr 2 \* 2 / 2`
echo "result is $val again"

if [ $val == 2 ]
then
  echo "yeah equal"
fi 

a=5
b=10

if [ $a -le $b ]
then
  echo 'a is not greater than b'
fi

if [ $a -lt $b -o $a -eq $b ]
then 
  echo 'a is not greater than b again'
fi


#!/bin/sh
a="abc"
b="efg"
if [ $a = $b ]
then
   echo "$a = $b : a is equal to b"
else
   echo "$a = $b: a is not equal to b"
fi
if [ $a != $b ]
then
   echo "$a != $b : a is not equal to b"
else
   echo "$a != $b: a is equal to b"
fi
if [ -z $a ]
then
   echo "-z $a : string length is zero"
else
   echo "-z $a : string length is not zero"
fi
if [ -n $a ]
then
   echo "-n $a : string length is not zero"
else
   echo "-n $a : string length is zero"
fi
if [ $a ]
then
   echo "$a : string is not empty"
else
   echo "$a : string is empty"
fi

string="abcd"
echo ${#string} #输出 4

string="alibaba is a great company"
echo ${string:1:4} #输出liba

string="alibaba is a great company"
echo `expr index "$string" i`