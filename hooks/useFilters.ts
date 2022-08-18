import { useMemo, useRef } from 'react';
import { IOptions } from '../types/IOptions';
import { IPost } from '../types/IPost';

export function useFilters(posts: IPost[], { sort = 'ASC', filter }: IOptions): { result: IPost[] } {
  const resultRef = useRef<IPost[]>(posts);

  useMemo(() => {
    if (!filter.name || !filter.value) return;
    if (!resultRef.current[0].hasOwnProperty(filter.name)) return;

    resultRef.current = resultRef.current.filter((post) => {
      const field = post[filter.name as keyof Omit<IPost, 'id' | 'image'>];

      return field.includes(filter.value);
    });
  }, [filter.name, filter.value, resultRef]);

  useMemo(() => {
    if (sort === 'ASC') {
      resultRef.current = [...resultRef.current].sort((a, b) => a.id - b.id);
    }

    if (sort === 'DESC') {
      resultRef.current = [...resultRef.current].sort((a, b) => b.id - a.id);
    }
  }, [sort, resultRef]);

  return { result: resultRef.current };
}
