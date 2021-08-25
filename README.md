---
title: Map 과 Set
---

# Map

Map 객체는 `키 와 값`을 한 쌍으로 이루어진 컬렉션입니다. Map 객체는 Map 생성자 함수로 생성합니다.

```js
const map = new Map();
```

## Map 요소 추가

Map 객체는 요소를 추가할때는 Map.prototype.set 를 사용합니다.

```js
// map 선언
const map = new Map();

// map 요소 추가 #1
map.set('key1', 'value1');
map.set('key2', 'value2');

// map 요소 추가 #2
map
  .set('key1', 'value1')
  .set('key2', 'value2');

console.log(map); // Map(2) { 'key' => 'value', 'key2' => 'value' }
```

또한, Map 은 중복된 키값이 있을때는 Map 객체에 저장되지 않습니다.

```js
// map 선언
const map = new Map([['key1', 'value1'], ['key1','value2']]);
console.log(map); // Map(1) { 'key1' => 'value2' }
```
 ## Map 요소 삭제

 Map 객체의 요소를 삭제하려면 Map.prototype.delete 메서드를 사용합니다. 또한 Map객체 요소의 전체를 삭제할경우에는
 Map.prototype.clear 를 사용합니다.

 ```js
 // map 선언
const map = new Map([['key1', 'value1'], ['key2', 'value2']]);

// map 요소 삭제
map.delete('key1')
console.log(map); // Map(1) { 'key2' => 'value2' }

// map 전체 요소 삭제
map.clear();
console.log(map); //Map(0) {}
```

## Map 요소 순회

Map 객체의 요소를 순회하려면 Map.prototype.forEach 메서드를 사용합니다. 이때, forEach가 받는 콜백함수의 인수는 3가지(값, 키, map) 입니다


 ```js
 // map 선언
const map = new Map([['key1', 'value1'], ['key2', 'value2']]);

map.forEach((val, key, mp) => {
  console.log(val + "," + key);
});

// 결과입니다.
// value1,key1
// value2,key2
```

## Set

Set 객체는 `중복되지 않는 값`들의 집합입니다. Set을 통해 교집합, 합집합, 차집합 등 수학적 집합 표현이 가능합니다.
Set은 Set 생성자 함수로 생성합니다.

```js
const set = new Set();
```

## Set 요소 추가

Set 객체는 요소를 추가할때는 Set.prototype.add 를 사용합니다.

```js
// set 선언
const set = new Set();

// set 요소 추가 #1
set.add(1);
set.add(2);
set.add(3);

// set 요소 추가 #2
set.add(1).add(2).add(3);

console.log(set); // Set(3) { 1, 2, 3 }
```

또한, Set 은 중복된 요소의 추가는 허용하지 않습니다.

```js
// set 선언
const set = new Set();
set.add('apple').add('banana').add('banana');

console.log(set); // Set(2) { 'apple', 'banana' }
```
 ## Set 요소 삭제
 
Set 객체의 요소를 삭제하려면 Set.prototype.delete 메서드를 사용합니다. 또한 Set객체 요소의 전체를 삭제할경우에는
Set.prototype.clear 를 사용합니다.

```js
// set 선언
const set = new Set(['apple', 'banana', 'orange']);

// set 요소 삭제
set.delete('banana')
console.log(set); // Set(2) { 'apple', 'orange' }

// set 전체 요소 삭제
set.clear();
console.log(set); // Set(0) {}
```

## Set 요소 순회

Set 객체의 요소를 순회하려면 Set.prototype.forEach 메서드를 사용합니다. 이때, forEach가 받는 콜백함수의 인수는 3가지(요소값, 요소값, Set) 입니다


 ```js
// set 선언
const set = new Set(['1', '2', '3']);

// set 요소 순회
set.forEach((val, val2, set) => {
  console.log(val, val2, set);
})

// 결과입니다.
// 1 1 Set(3) { '1', '2', '3' }
// 2 2 Set(3) { '1', '2', '3' }
// 3 3 Set(3) { '1', '2', '3' }
```


