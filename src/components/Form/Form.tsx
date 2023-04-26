import './form.scss';
import classNames from 'classnames';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Sort } from '../../type/types';
// import { useEffectOnce } from 'usehooks-ts';

export const Form = () => {
  const [isActive, setIsActive] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [sorted, setSorted] = useState<string | null>(null);

  const setIsActiveForm = useMemo(() => (argument: string | null) => {
    if (isActive || !argument) {
      setIsActive(null);

      return;
    }

    setIsActive(argument);
  }, [isActive]);

  console.log(sorted)
  const setSortedMethod = useCallback((method: string | null) => {
    setSorted(method);
  }, [location])

  const setFilter = useCallback((argument: 'sort', value: string) => {
    searchParams.set(argument, value);
    setSearchParams(searchParams);
    setIsActiveForm(value);
  }, [location]);

  const setFilterLeft = useCallback((argument: 'sort', value: string) => {
    setSortedMethod(value);
    searchParams.set(argument, value);
    setSearchParams(searchParams);
    setIsActiveForm(null);
  },[location]);

  const getSelectTitle = useCallback(() => {
    return searchParams.get('sort') !== Sort.NewRelease
      && searchParams.get('sort') !== Sort.BestSales
      && searchParams.get('sort') || 'Sort by';
  },[searchParams, location])

  useEffect(() => {
    const sort = searchParams.get('sort');

    setSortedMethod(sort);
  }, [searchParams, location])

  return (
    <div className="form">
      <div className="form__left-buttons">
        <button
          type="button"
          className={classNames('form__button',
            { 'form__button--active': sorted === Sort.NewRelease })}
          onClick={() => (
            setFilterLeft('sort', Sort.NewRelease)
          )}
        >
          {Sort.NewRelease}
        </button>

        <button
          type="button"
          className={classNames('form__button',
          { 'form__button--active': sorted === Sort.BestSales})}
          onClick={() => (
            setFilterLeft('sort', Sort.BestSales)
          )}
        >
          {Sort.BestSales}
        </button>
      </div>


      <div className="form__item">
        <div
          className={classNames('form__select',
            { 'form__select--active': isActive === 'sort' })}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
              setIsActiveForm(null);
            }
          }}
        >
          <button
            type="button"
            data-form="sort"
            className={classNames("form__selected-option", 
            {"form__selected-option--active": isActive === 'sort'}
            )}
            onClick={(event) => (
              setIsActiveForm(event.currentTarget.dataset.form || null)
            )}
          >
            {getSelectTitle()}
          </button>

          <div
            className={classNames('form__options-wrapper',
              { 'form__options-wrapper--active': isActive === 'sort' })}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) {
                setIsActiveForm(null);
              }
            }}
          >
            <button
              className="form__option"
              type="button"
              onClick={() => (
                setFilter('sort', Sort.ByNameA)
              )}
            >
              {Sort.ByNameA}
            </button>

            <button
              className="form__option"
              type="button"
              onClick={() => (
                setFilter('sort', Sort.ByNameZ)
              )}
            >
              {Sort.ByNameZ}
            </button>

            <button
              className="form__option"
              type="button"
              onClick={() => (
                setFilter('sort', Sort.CheaperFirst)
              )}
            >
              {Sort.CheaperFirst}
            </button>

            <button
              className="form__option"
              type="button"
              onClick={() => (
                setFilter('sort', Sort.ExpensiveFirst)
              )}
            >
              {Sort.ExpensiveFirst}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
