import { useState, useEffect } from 'react';

export const useSortObject = (list, fieldName, sortType) => {
  const [sorted, setSorted] = useState([]);

  const compare = (a, b) => {
    if (a[fieldName] > b[fieldName]) {
      return sortType === 'ASC' ? 1 : -1
    } else if(a[fieldName] < b[fieldName]) {
      return sortType === 'ASC' ? -1 : 1
    } else {
      return 0
    }
  }

  useEffect(() => {
    const sortedList = list.sort(compare)
    setSorted(sortedList)
  }, [list.length])

  return { list: sorted }
}