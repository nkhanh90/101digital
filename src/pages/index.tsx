import { AuthGuard } from '@/components/AuthGuard';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { IInvoiceProps } from '@/interface/IInvoice';
import { COOKIE_KEY, getAccessTokenServerside, getOrgTokenServerside, removeCookies } from '@/utils/cookiesUtils';
import { IInvoiceResponseProps, getInvoices } from '@/service/invoiceService';
import { IncomingMessage, ServerResponse } from 'http';
import { NextApiRequestCookies } from 'next/dist/server/api-utils';
import { useRouter } from 'next/router';
import qs from 'qs';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { Box, Button, Input, InputAdornment, TablePagination, TableSortLabel, TextField } from '@mui/material';
import { NextParsedUrlQuery } from 'next/dist/server/request-meta';
import { IReduxState } from '@/interface/IRedux';
import { debounce, sortBy } from 'lodash';
import { AxiosError } from 'axios';

export type IInvoiceFilterProps = {
  pageNum: number;
  pageSize: number;
  dateType: string;
  sortBy: string;
  ordering: string;
  keyword?: string;
};

export interface IColumnProps {
  field: keyof IInvoiceProps;
  headerName: string;
  sortable?: string;
  width?: number;
  formatter?: (params: IInvoiceProps) => any;
}

const columns: IColumnProps[] = [
  {
    field: 'invoiceId',
    headerName: 'Invoice ID',
  },
  {
    field: 'invoiceNumber',
    headerName: 'Invoice Number',
  },
  {
    field: 'createdAt',
    headerName: 'Created At',
    sortable: 'CREATED_DATE',
    formatter: (p: IInvoiceProps) => dayjs(p.createdAt).format('DD/MM/YYYY HH:mm'),
  },
  {
    field: 'totalPaid',
    headerName: 'Total Paid',
  },
  {
    field: 'totalDiscount',
    headerName: 'Total Discount',
  },
  {
    field: 'totalAmount',
    headerName: 'Total Amount',
  },
  {
    field: 'totalTax',
    headerName: 'Total Tax',
  },
  {
    field: 'currency',
    headerName: 'Currency',
  },
  {
    field: 'invoiceDate',
    headerName: 'Invoice Date',
  },
];

const initFilter: IInvoiceFilterProps = {
  pageNum: 1,
  pageSize: 10,
  dateType: 'INVOICE_DATE',
  sortBy: 'CREATED_DATE',
  ordering: 'ASCENDING',
};

export interface HomePageQuery extends NextParsedUrlQuery {
  pageNum: string;
  pageSize: string;
  dateType: string;
  sortBy: string;
  ordering: string;
}

export default function Invoices(props: IInvoiceResponseProps) {
  const router = useRouter();
  const query = router.query as HomePageQuery;
  const { auth } = useSelector((state: IReduxState) => state);
  const [invoices, setInvoices] = useState<IInvoiceProps[]>([]);
  const [total, setTotal] = useState(0);
  const [filter, setFilter] = useState<any>(initFilter);

  console.log(JSON.stringify(props));
  useEffect(() => {
    if (Object.keys(query).length > 0) {
      setFilter(query);
    }
  }, [query]);

  useEffect(() => {
    if (props.data.data) {
      setInvoices(props.data.data);
    }
    setTotal(props?.data.paging.totalRecords);
  }, [props]);

  const updateFilter = (field: string, value: string | number) => {
    console.log(field, value);
    router.replace(
      `?${qs.stringify({
        ...filter,
        [field]: value,
      })}`
    );
  };

  const debounceSearch = debounce((e) => {
    router.replace(
      `?${qs.stringify({
        ...filter,
        keyword: e.target.value,
      })}`
    );
  }, 1500);

  const handleSort = (column: IColumnProps) => {
    if (filter.sortBy === column.sortable) {
      router.replace(
        `?${qs.stringify({
          ...filter,
          ordering: filter.ordering === 'ASCENDING' ? 'DESCENDING' : 'ASCENDING',
        })}`
      );
    } else {
      router.replace(
        `?${qs.stringify({
          ...filter,
          sortBy: column.sortable,
          ordering: 'DESCENDING',
        })}`
      );
    }
  };

  return (
    <AuthGuard>
      <>
        <Box pt={3} pb={5}>
          <Input
            id='input-with-icon-adornment'
            placeholder='Search invoice by keyword'
            fullWidth
            onChange={debounceSearch}
          />
        </Box>
        <Box textAlign='right' mb={3}>
          <Button variant='contained' onClick={() => router.push('/form')}>
            Create a new invoice
          </Button>
        </Box>
        <TableContainer sx={{ marginTop: 0 }}>
          <Table stickyHeader aria-label='sticky table'>
            <TableHead>
              <TableRow>
                {columns.map((column: IColumnProps) => (
                  <TableCell key={column.field}>
                    {column.sortable ? (
                      <TableSortLabel
                        active={filter.sortBy === column.sortable}
                        onClick={() => handleSort(column)}
                        direction={filter.ordering === 'ASCENDING' ? 'asc' : 'desc'}
                      >
                        {column.headerName}
                      </TableSortLabel>
                    ) : (
                      <>{column.headerName}</>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {invoices?.length === 0 ? (
                <TableRow hover role='checkbox' tabIndex={-1}>
                  <TableCell sx={{ textAlign: 'center' }}>No result</TableCell>
                </TableRow>
              ) : (
                invoices?.map((row) => {
                  return (
                    <TableRow hover role='checkbox' tabIndex={-1} key={row.invoiceId}>
                      {columns.map((column) => {
                        const value = row[column.field];
                        return (
                          <TableCell key={column.field}>{column.formatter ? column.formatter(row) : value}</TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component='div'
          count={total}
          rowsPerPage={10}
          page={+filter.pageNum - 1 ?? 0}
          onPageChange={(event, newPage) => updateFilter('pageNum', +newPage + 1)}
          onRowsPerPageChange={(e) => updateFilter('pageSize', e.target.value)}
        />
      </>
    </AuthGuard>
  );
}

export async function getServerSideProps({
  query,
  req,
  res,
}: {
  query: string;
  req: IncomingMessage;
  res: ServerResponse;
}) {
  const accessToken = getAccessTokenServerside(req, res);
  const orgToken = getOrgTokenServerside(req, res);
  if (typeof accessToken === 'string' && typeof orgToken === 'string') {
    try {
      const invoices = await getInvoices(
        {
          accessToken: accessToken,
          orgToken: orgToken,
        },
        qs.stringify(query)
      );
      return { props: { data: invoices } };
    } catch (err: any) {
      if (err.response.status === 401) {
        removeCookies([COOKIE_KEY.accessToken, COOKIE_KEY.orgToken]);
        return {
          redirect: {
            permanent: false,
            destination: '/login',
          },
        };
      }
    }
  }

  return {
    redirect: {
      permanent: false,
      destination: '/login',
    },
    props: { data: '' },
  };
}
