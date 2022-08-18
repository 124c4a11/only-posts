import { useMemo, useRef } from 'react';
import { IOptions } from '../types/IOptions';
import { IPost } from '../types/IPost';

export function useFilters(posts: IPost[], { sort = 'ASC', filter }: IOptions): { result: IPost[] } {
  const resultRef = useRef<IPost[]>(posts);

  useMemo(() => {
    if (!filter.name || !filter.value) return;

    resultRef.current = resultRef.current.filter((post) => {
      return post[filter.name as keyof Omit<IPost, 'id'>].includes(filter.value);
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
