
/** 一、type vs interface */

// 1、interface 和 type 都可以拓展
interface Person {
    name: string
    age: number
}
interface SetPerson {
    (name: string, age: number): void
}

type User = {
    name: string
    age: number
  };  
type SetUser = (name: string, age: number) => void;

// 2、interface 可以 extends type, type 也可以 extends interface， 虽然效果差不多，但是两者语法不同
interface Name  {
    name: string
}
interface User2 extends Name {
    age: number
}

type Age = {
    age: number
}
type User3  = Age & {name: string}
type User4  = Name & {age: number}  // type extends interface
interface User5 extends Age {       // interface extends type
    name: string
}

// 3、不同点： type 可以而 interface 不行
type A = string  // 基本类型别名

interface Dog {  // 联合类型
    wong();
}
interface Cat {
    miao();
}
type Pet = Dog | Cat
type PetList = [Dog, Pet]  // 具体定义数组每个位置的类型

let div = document.createElement('div');
type B = typeof div  //type 语句中还可以使用 typeof 获取实例的 类型进行赋值


// 4、不同点： type 可以而 interface 不行
interface C {
    name: string
    age: number
}  
interface C {
    sex: string
}
/*interface 能够声明合并
C 接口为 {
  name: string
  age: number
  sex: string 
}
*/


/** 二、进阶用法 */
// type Partial<T> = { [P in keyof T]?: T[P] };
type Person1 = Partial<Person>;  // 拿到Person所有属性，变为可选

// type Required<T> = { [P in keyof T]-?: T[P] };
type Person2 = Required<Person>;  // 拿到Person所有属性，变为必选

// type Readonly<T> = { readonly [P in keyof T]: T[P] };
type Person3 = Readonly<Person>;  // 拿到Person所有属性，变为可读项

// type Pick<T, K extends keyof T> = { [P in K]: T[P] };
type Person4 = Pick<Person, 'name' | 'age'> // 从Person中取出name,age属性

// type Record<K extends keyof any, T> = { [P in K]: T };
type person = {
    prop1: string;
    prop2: string
    prop3: string
};
type someProps = Record<12 | keyof person, string>;
let newPerson: someProps = {
    prop1: "111",
    prop2: "222",
    prop3: "444",
    12: "asdad",
};

// type Exclude<T, U> = T extends U ? never : T;
type T = Exclude<1 | 2, 1 | 3> // -> 2 从T中排除U

// type Omit<T, K> = Pick<T, Exclude<keyof T, K>>
type Person5 = Omit<{name: string, age: number}, 'name'> // -> { age: number } 未包含（T中未包含K的属性）