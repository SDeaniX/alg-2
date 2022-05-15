const number_of_elements = prompt('Введите число элементов массива:', '');
let original_array = create_array();

let array = original_array.slice();

    

//
// РЕАЛИЗАЦИЯ ФУНКЦИЙ
//



function create_array() {
    let array = [];

    let time = performance.now();
    for (let i = 0; i < number_of_elements; i++) {
        array.push(Math.floor(Math.random() * 100));
    }   
    time = performance.now() - time;

    console.log('Создание массива в мс: ' + time);
    return array;
}

document.getElementById('load_array').onclick = function() {
    
    for (let i = 0; i < number_of_elements; i++) {
        array[i] = original_array[i];
    }

    console.log('Загружен оригинальный массив.');
}

document.getElementById('show_array').onclick = function() {
    console.log(array);
}



//
// РЕАЛИЗАЦИЯ СОРТИРОВОК
//



// поменять местами
function swap(first, second) {
    let temp = array[first];
    array[first] = array[second];
    array[second] = temp;
}

// пузырьковая
document.getElementById('bubble_sort').onclick = function() {

    let time = performance.now();
    for (let end = number_of_elements - 1; end > 1; end--) {

        for (start = 0; start < end; start++) {
            if (array[start] > array[start + 1]) swap(start, start + 1);
        }

    }
    time = performance.now() - time;

    console.log('Массив отсортирован. Время в мс: ' + time);
}



// вставками
document.getElementById('insertion_sort').onclick = function() {
    
    let time = performance.now();
    for (let i = 1; i < number_of_elements; i++) { 

        let key = array[i];
        j = i - 1;
        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            j = j - 1;
        }
        array[j + 1] = key;

    }
    time = performance.now() - time;

    console.log('Массив отсортирован. Время в мс: ' + time);
}



// выбором
document.getElementById('selection_sort').onclick = function() {
    
    let time = performance.now();
    for (let i = 0; i < number_of_elements - 1; i++) {

        let min_elem_index = i;
        for (let j = i + 1; j < number_of_elements; j++) {
            if (array[j] < array[min_elem_index]) min_elem_index = j;
        }
        swap(min_elem_index, i);

    }
    time = performance.now() - time;

    console.log('Массив отсортирован. Время в мс: ' + time);
}



// слияние подмассивов
function merge(left_array, right_array) {

    let sorted_array = [];
    
    while (left_array.length && right_array.length) {
        sorted_array.push( left_array[0] > right_array[0] ? right_array.shift() : left_array.shift() );
    }
    
    while ( left_array.length ) {
        sorted_array.push( left_array.shift() )
    }
    while ( right_array.length ) {
        sorted_array.push( right_array.shift() )
    }

    return sorted_array;
}

// слиянием - функция
function merge_sort(input_array) {

    if ( input_array.length < 2 ) return input_array;
    let half = Math.floor(input_array.length / 2 );

    let left_array = input_array.slice(0, half);
    let right_array = input_array.slice(half, input_array.length);
    
    let sorted_left_array = merge_sort(left_array);
    let sorted_right_array = merge_sort(right_array);

    return merge(sorted_left_array, sorted_right_array);
}

// слиянием
document.getElementById('merge_sort').onclick = function() {
   
    let time = performance.now();
    array = merge_sort(array).slice();
    time = performance.now() - time;

    console.log('Массив отсортирован. Время в мс: ' + time);
}



// найти опорный элемент
function partition(start, end) {
 
    let support = array[end];
    let i = (start - 1);
 
    for (let j = start; j <= end - 1; j++) {

        if (array[j] < support) {
            i++;
            swap(i, j);
        }

    }
    swap(i + 1, end);

    return (i + 1);
}

// быстрая - функция
function quick_sort(start, end) {
    
    if (start < end) {

        let pt_index = partition(start, end);
        quick_sort(start, pt_index - 1);
        quick_sort(pt_index + 1, end);

    }

}

// быстрая
document.getElementById('quick_sort').onclick = function() {
    
    let time = performance.now();
    quick_sort(0, number_of_elements - 1);
    time = performance.now() - time;

    console.log('Массив отсортирован. Время в мс: ' + time);
}