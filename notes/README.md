1. a browser is simply incapable of providing a fine-enough resolution on 
the timers in order to handle them accurately as they, themselves, are restricted by the 
timing restrictions of the operating system
2. Timers are a particular problem as they are generally managed outside of the flow of the normal single-threaded JavaScript engine (through other browser threads)
3. It should be noted that anything that isn't a simple variable, primitive, or assignment will actually need to be wrapped in a parentheses in order for the correct value to be returned 

    var o = eval('({ninja: 1})'); ==> if will not be wrapped by parentheses, it will return  the value of 1
    eval("(function(){return 'Ninja';})"); ==> like previous to say, it will return string 'Ninja'

4. the 'in' opererator will check up the properties of the prototype (be careful of iterate operation)=> hasOwnProperty will not
