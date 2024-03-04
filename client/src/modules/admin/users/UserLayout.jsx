import { Badge, Button, Card, Label, TextInput } from "flowbite-react";
import { useEffect, useMemo, useState } from "react";
import AxiosClient from "../../../config/http-gateway/http-client";
import TableComponent from "../../../components/TableComponent";
import { LiaEdit, LiaTrashRestoreSolid, LiaTrashSolid } from "react-icons/lia";
import { FaSearch } from "react-icons/fa";

const UserLayout = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [filterText, setFilterText] = useState("");

  const columns = useMemo(() => [
    {
      name: "#",
      cell: (row, index) => <>{index + 1}</>,
      sortable: true,
      selector: (row, index) => index + 1,
    },
    {
      name: "Username",
      cell: (row) => <>{row.username}</>,
      sortable: true,
      selector: (row) => row.username,
    },
    {
      name: "Rol",
      cell: (row) => <>{row.roles[0].name}</>,
      sortable: true,
      selector: (row) => row.roles[0].name,
    },
    {
      name: "Estado",
      cell: (row) => {
        <Badge color={row.status ? "success" : "failure"}>
          {row.status ? "Activo" : "Inactivo"}
        </Badge>;
      },
      sortable: true,
      selector: (row) => row.status,
    },
    {
      name: "Acciones",
      cell: (row) => (
        <div className="flex gap-2 p-2">
          <Button outline pill color="warning" size={"sm"}>
            {" "}
            <LiaEdit />{" "}
          </Button>
          <Button
            outline
            pill
            color={row.status ? "failure" : "success"}
            size={"sm"}
          >
            {row.status ? <LiaTrashSolid /> : <LiaTrashRestoreSolid />}
          </Button>
        </div>
      ),
    },
  ]);

  const getUsers = async () => {
    try {
      const response = await AxiosClient({
        url: "/user/",
        method: "GET",
      });
      console.log(response);
      if (!response.error) setUsers(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const filter = () => {
    return users.filter((user) => user.username.includes(filterText));
  };

  return (
    <>
      <section className=" flex flex-col pt-4 px-3 gap-4">
        <h1 className="text-2xl font-bold">Usuarios</h1>
        <div className="flex w-full justify-between">
          <div className="max-w-md">
            <Label htmlFor="search" value="Buscar" />
            <TextInput
              id="search"
              type="text"
              rightIcon={FaSearch}
              value={filterText}
              placeholder="Buscar..."
              onChange={(e) => setFilterText(e.target.value)}
            />
          </div>
          <div className="flex">
            <Button pill outline color="success">
              Agregar
            </Button>
          </div>
        </div>
        <Card>
          <TableComponent
            data={filter()}
            columns={columns}
            progress={loading}
          />
        </Card>
      </section>
    </>
  );
};

export default UserLayout;
