import ListComponent from "../../components/todo/ListComponent";

const ListPage = () => {
    return (
        <>
            <div className="p-4 w-full bg-white">
                <div className="text-3xl font-extrabold">
                    Todo List Page Component
                </div>
            </div>
            <ListComponent />
        </>
    );
};
export default ListPage;
