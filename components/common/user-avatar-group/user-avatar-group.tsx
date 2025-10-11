import { useState } from "react";
import { Plus, Search } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface User {
  id: number;
  name: string;
  email: string;
  profile: {
    profile_picture: string;
  }
}

interface Props {
  users: User[];
  onChange: (updatedUsers: User[]) => void;
}

const mockUserList: User[] = [
  {
    id: 1,
    name: "Ram Bahadur Khadka",
    email: "A@email.com",
    profile:{

    profile_picture:  "https://randomuser.me/api/portraits/men/75.jpg",
    }
  },
  {
    id: 2,
    name: "Ram Bahadur Khadka",
    email: "A@email.com",
    profile:{

    profile_picture:  "https://randomuser.me/api/portraits/women/65.jpg",
    }
  },
  {
    id: 3,
    name: "Ram Bahadur Khadka",
    email: "A@email.com",
    profile:{

    profile_picture:  "https://randomuser.me/api/portraits/men/45.jpg",
    }
  },
];

const UserAvatarGroup: React.FC<Props> = ({ users, onChange }) => {
  const [open, setOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>(
    users.map((u) => u.id)
  );

  const toggleUser = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((uid) => uid !== id) : [...prev, id]
    );
  };

  const handleSave = () => {
    const selectedUsers = mockUserList.filter((u) =>
      selectedIds.includes(u.id)
    );
    onChange(selectedUsers);
    setOpen(false);
  };
  console.log('sdsds', users);

  return (
    <div className="relative flex items-center space-x-[-10px]">
      {users.map((user) => (
        <Image
          key={user.id}
          src={user?.profile?.profile_picture}
          alt={user.name}
          width={32}
          height={32}
          className="rounded-full border-2 border-white"
        />
      ))}
      <button
        onClick={() => setOpen(true)}
        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 bg-white hover:bg-gray-100"
      >
        <Plus size={16} />
      </button>

      {open && (
        <div className=" space-y-2 absolute top-10 z-50 bg-white border shadow-md p-4 rounded w-64">
          <h4 className="text-sm font-semibold mb-2">Add User</h4>
          <div className="flex items-center border rounded-sm pl-2">
            <Search className="h-5 w-5" />
            <Input
              className=" border-none shadow-none focus:!border-none focus:!ring-0 focus:outline-none h-9"
              placeholder="Search User By Name"
            />
          </div>
          <div className="max-h-40 overflow-y-auto space-y-2">
            {mockUserList.map((user) => (
              <div key={user.id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedIds.includes(user.id)}
                  onChange={() => toggleUser(user.id)}
                />
                <Image
                  src={user.profile.profile_picture}
                  alt={user.name}
                  width={24}
                  height={24}
                  className="rounded-full"
                />
                <span className="text-sm">{user.name}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-end">
            <Button
              onClick={handleSave}
              className="mt-2  text-white text-sm py-1 px-3 rounded"
            >
              Save Changes
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserAvatarGroup;
