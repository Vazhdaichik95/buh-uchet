import { FC } from 'react';
import {
  getCategories,
  isLoadingCategories
} from '../../services/slices/categoriesSlice';
import { useSelector } from '../../services/store';

export const DocumentsCategories: FC = () => {
  const categories = useSelector(getCategories);
  const isLoading = useSelector(isLoadingCategories);

  if (isLoading) return <div>LOading...</div>;

  return (
    <>
      <h1>БухУчёт</h1>
      <p>Приложение-тест для выгрузки еженедельных отчетов</p>
      {categories?.map((category) => {
        <p>{category.name}</p>;
      })}
    </>
  );
};
