import type { IAudio } from "@/data/types/models";

export function mergeArrays(arr1: IAudio[], arr2: IAudio[], key: keyof IAudio): IAudio[] {
    // Копируем первый массив в новый массив
    const result: IAudio[] = [...arr1];
  
    // Проходим по каждому объекту во втором массиве
    for (const obj2 of arr2) {
      // Проверяем, существует ли объект с тем же значением ключа в результирующем массиве
      const duplicate = result.some((obj1) => obj1[key] === obj2[key]);
  
      // Если объекта с таким же значением ключа нет, добавляем его в результат
      if (!duplicate) {
        result.push(obj2);
      }
    }
  
    return result;
};