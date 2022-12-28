import { useState, useEffect, FormEvent } from "react";
import { generateData } from "../utils/data";
import {
  Button,
  Form,
  InputGroup,
  Pagination,
  Table as BTable,
} from "react-bootstrap";
import { useDebounce } from "../hooks/UseDebounce";
import { MagnifyingGlass, Pencil, PlusCircle, Trash } from "phosphor-react";
import "../scss/table.scss";
import { useNavigate } from "react-router-dom";
import { Modal } from "./Modal";

interface Props {}

type TableData = {
  id: number;
  firstName: string;
  lastName: string;
  gender: string;
  formattedBirthDate: string;
};

export function Table({}: Props) {
  const [data, setData] = useState<TableData[]>([]); // Dados da tabela
  const [filteredData, setFilteredData] = useState<TableData[]>([]); // Dados filtrados
  const [currentPage, setCurrentPage] = useState(1); // Página atual
  const [rowsPerPage, setRowsPerPage] = useState(5); // Limite de linhas por página
  const [totalPages, setTotalPages] = useState(1); // Número total de páginas
  const [searchTerm, setSearchTerm] = useState(""); // Termo de pesquisa
  const [handleSortColumn, setHandleSortColumn] = useState("id"); // Coluna de ordenação
  const [sortDirection, setSortDirection] = useState("asc"); // Direção de ordenação (ascendente ou descendente)
  const debouncedSearchTerm = useDebounce(searchTerm); // Termo de pesquisa com debounced
  const [show, setShow] = useState(false);

  const navigate = useNavigate();

  // Manipulador de cliques para atualizar o número da página atual
  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  // gera dados aleatórios pasando a quantidade pelo parametro
  const TableData = generateData(50);

  // Filtra os dados da tabela com base no número da página atual e no limite de linhas por página
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex =
    rowsPerPage === -1 ? filteredData.length : startIndex + rowsPerPage;
  const pageData: TableData[] = filteredData.slice(startIndex, endIndex);

  // Ordenar os dados da tabela pelo cabeçalho da coluna
  const handleSort = (column: string) => {
    if (column === handleSortColumn) {
      // Inverte a direção de ordenação se a coluna atual já estiver sendo usada para ordenação
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // Começar a ordenação pela coluna selecionada
      setHandleSortColumn(column);
      setSortDirection("asc");
    }
  };

  // mapear os nomes das colunas da tabela para os nomes das propriedades do objeto TableData em um objeto de mapeamento e usar esse objeto para acessar as propriedades de forma mais segura:
  const columnMapping: { [key: string]: keyof TableData } = {
    "id": "id",
    "firstName": "firstName",
    "lastName": "lastName",
    "gender": "gender",
    "formattedBirthDate": "formattedBirthDate",
  };

  // Classificar os dados da tabela com base na coluna de ordenação e na direção de ordenação
  if (handleSortColumn && sortDirection) {
    pageData.sort((a: TableData, b: TableData) => {
      if (
        a[columnMapping[handleSortColumn]] < b[columnMapping[handleSortColumn]]
      ) {
        return sortDirection === "asc" ? -1 : 1;
      }
      if (
        a[columnMapping[handleSortColumn]] > b[columnMapping[handleSortColumn]]
      ) {
        return sortDirection === "asc" ? 1 : -1;
      }
      return 0;
    });
  }
  // Criar uma lista de links de página sequenciais mais próximos da página atual
  let pageLinks = [];
  for (let i = 1; i <= totalPages; i++) {
    pageLinks.push(i);
  }
  if (totalPages > 5) {
    // Caso haja mais de 5 páginas, exiba os links de página sequenciais mais próximos da página atual
    if (currentPage - 2 > 1 && currentPage + 2 <= totalPages) {
      // Exibe os links de página sequenciais mais próximos da página atual se a página atual for suficientemente longe do início e do fim
      pageLinks = [
        currentPage - 2,
        currentPage - 1,
        currentPage,
        currentPage + 1,
        currentPage + 2,
      ];
    } else if (currentPage - 2 <= 1) {
      // Exibe os primeiros 5 links de página se a página atual estiver perto do início
      pageLinks = [1, 2, 3, 4, 5];
    } else if (currentPage + 2 > totalPages) {
      // Exibe os últimos 5 links de página se a página atual estiver perto do fim
      pageLinks = [
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }
  }

  useEffect(() => {
    setData(TableData);
  }, []);

  useEffect(() => {
    // Atualiza o totalPages com base na quantidade de linhas da tabela e no limite de linhas por página
    setTotalPages(Math.ceil(filteredData.length / rowsPerPage));
  }, [filteredData, rowsPerPage]);

  useEffect(() => {
    // Atualiza o número total de páginas com base no limite de linhas por página
    setTotalPages(totalPages);
    setTotalPages(
      rowsPerPage === -1 ? 1 : Math.ceil(filteredData.length / rowsPerPage)
    );
  }, [filteredData, rowsPerPage]);

  useEffect(() => {
    // Filtra os dados da tabela com base no termo de pesquisa
    const searchResults =
      searchTerm.length > 0
        ? data.filter((row) =>
            row.firstName
              .toLowerCase()
              .includes(debouncedSearchTerm.toLowerCase())
          )
        : data;

    setFilteredData(searchResults);
    setCurrentPage(1);
  }, [data, debouncedSearchTerm]);

  return (
    <div>
      <div className="flex m-1">
        <Button className="d-flex gap-1" variant="success" onClick={() => navigate("/AddPerson")}>
          <PlusCircle className="mt" size={20} />
          Person
        </Button>
        <InputGroup className="d-flex flex-row-reverse my-1">
          <div className="position-relative">
            <input
              type="text"
              value={searchTerm}
              placeholder="Search"
              className="rounded search"
              onChange={(event) => setSearchTerm(event.target.value)}
            />
            <MagnifyingGlass className="position-absolute end-0 top-50 bottom-50 translate-middle" />
          </div>
        </InputGroup>
      </div>
      <BTable striped bordered hover responsive variant="light">
        <thead>
          <tr className="cursor-pointer">
            <th onClick={() => handleSort("id")}>ID</th>
            <th onClick={() => handleSort("firstName")}>First Name</th>
            <th onClick={() => handleSort("lastName")}>Last Name</th>
            <th onClick={() => handleSort("gender")}>Gender</th>
            <th onClick={() => handleSort("formmatedBirthDate")}>Birth Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {searchTerm.length === undefined || ""
            ? pageData.map((row) => (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td>{row.firstName}</td>
                  <td>{row.lastName}</td>
                  <td>{row.gender}</td>
                  <td>{new Date(row.formattedBirthDate).toLocaleDateString()}</td>
                  <td className="td-width">
                    <Button className="rounded btn-sm mx-2">
                      <Pencil size={16} className="mb-1" onClick={() => setShow(true)} /> Edit
                    </Button>
                    <Button className="rounded btn-sm" variant="danger">
                      <Trash size={16} className="mb-1" /> Delete
                    </Button>
                  </td>
                </tr>
              ))
            : pageData.map((row) => (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td>{row.firstName}</td>
                  <td>{row.lastName}</td>
                  <td>{row.gender}</td>
                  <td>{row.formattedBirthDate}</td>
                  <td className="td-width">
                    <Button className="rounded btn-sm mx-2" onClick={() => setShow(true)}>
                      <Pencil size={16} className="mb-1" /> Edit
                    </Button>
                    <Button className="rounded btn-sm" variant="danger">
                      <Trash size={16} className="mb-1" /> Delete
                    </Button>
                  </td>
                </tr>
              ))}
        </tbody>
      </BTable>
      <div className="d-flex justify-content-between align-items-center mx-2">
        <div className="d-flex gap-1 justify-content-center align-items-center text-center align-text">
          <label className="visibility" htmlFor="rows-per-page">
            Show
          </label>
          <Form.Select
            id="rows-per-page"
            style={{ width: 60 }}
            value={rowsPerPage}
            size="sm"
            onChange={(event) => setRowsPerPage(parseInt(event.target.value))}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="-1">All</option>
          </Form.Select>
          <div className="visibility flex">entries</div>
        </div>

        <div className="visibility">
          Showing {currentPage} of {totalPages} pages
        </div>
        <Pagination aria-label="Tabela de paginação">
          <Pagination.First
            onClick={() => handlePageClick(1)}
            disabled={currentPage === 1}
          />
          {pageLinks.map((page) => (
            <Pagination.Item
              key={page}
              className={
                page === currentPage ? "page-item active" : "page-item"
              }
              onClick={() => handlePageClick(page)}
              disabled={page === currentPage}>
              {page}
            </Pagination.Item>
          ))}
          <Pagination.Last
            onClick={() => handlePageClick(totalPages)}
            disabled={currentPage === totalPages}
          />
        </Pagination>
      </div>

      <Modal show={show} setShow={setShow}/>
    </div>
  );
}
