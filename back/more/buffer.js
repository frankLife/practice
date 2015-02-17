/*
.slice方法也不是返回一个新的Buffer，而更像是返回了指向原Buffer中间的某个位置的指针
因此对.slice方法返回的Buffer的修改会作用于原Buffer
 */
var bin = new Buffer([ 0x68, 0x65, 0x6c, 0x6c, 0x6f ]);
var sub = bin.slice(2);

sub[0] = 0x65;
console.log(bin); // => <Buffer 68 65 65 6c 6f>
/*
如果想要拷贝一份Buffer，得首先创建一个新的Buffer，并通过.copy方法把原Buffer中的数据复制过去。
这个类似于申请一块新的内存，并把已有内存中的数据复制过去。
 */
var bin = new Buffer([ 0x68, 0x65, 0x6c, 0x6c, 0x6f ]);
var sub2 = new Buffer(bin.length);
bin.copy(sub2);

console.log(sub2);