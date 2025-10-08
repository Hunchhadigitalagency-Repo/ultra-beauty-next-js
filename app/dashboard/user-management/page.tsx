// import UserManagementCards from "./components/user-management-cards";
import UserManagementList from "./components/user-management-list";

const UserManagementPage = () => {
  return (
    <main className="space-y-4">
      {/* <section className="bg-white p-4">
        <UserManagementCards />
      </section> */}

      <UserManagementList />
    </main>
  );
};

export default UserManagementPage;
