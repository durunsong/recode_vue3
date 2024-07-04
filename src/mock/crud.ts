import { MockMethod } from 'vite-plugin-mock';

import crudData from './CRUDData';

export default [
  {
    url: '/systemservice/',
    method: 'get',
    response: option => {
      const query = option.query;
      let data = [...crudData];
      if (query.name) {
        data = data.filter(v => {
          return v.name.indexOf(query.name) >= 0;
        });
      }

      return {
        code: 0,
        message: 'ok',
        data: {
          total: data.length,
          size: query.size,
          pages: query.page,
          current: 1,
          records: data
        }
      };
    }
  },

  {
    url: '/systemservice/',
    method: 'post',
    response: option => {
      const data = option.body;
      if (data.name) {
        const obj = {
          ...data,
          id: new Date().getTime()
        };
        crudData.push(obj);
        return {
          code: 0,
          message: 'ok',
          data: {
            code: 0,
            message: 'ok',
            data: obj
          }
        };
      }
      return {
        code: 0,
        message: 'ok',
        data: {
          code: 0,
          message: 'ok',
          data: null
        }
      };
    }
  },

  {
    url: '/systemservice/:id/',
    method: 'put',
    response: option => {
      console.log(option);
      const data = option.body;
      const index = crudData.findIndex(v => v.id === data.id);
      crudData[index] = data;
      return {
        code: 0,
        message: 'ok',
        data: {
          code: 0,
          message: 'ok',
          data: data
        }
      };
    }
  },

	{
    url: '/systemservice/:id/',
    method: 'delete',
    response: option => {
      console.log(option);
			const id = option.query.id
      const index = crudData.findIndex(v => v.id === id);
			crudData.splice(index, 1)
      return {
        code: 0,
        message: 'ok',
        data: {
          code: 0,
          message: 'ok',
          data: null
        }
      };
    }
  }
] as MockMethod[];
