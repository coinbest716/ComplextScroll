import React, { useState } from "react";
import { User } from "../../types";
import Avatar from "../shared/Avatar";
import Button from "../shared/Button";
import { GiftIcon, GlobeIcon, CopyIcon } from "lucide-react";

interface UserInfoSidebarProps {
  user: User;
}

const UserInfoSidebar: React.FC<UserInfoSidebarProps> = ({ user }) => {
  const [showDetail, setShowDetail] = useState(false);
  return (
    <div className="bg-white rounded-lg">
      <div className="mb-6">
        <Avatar
          src={user.avatar}
          alt={user.displayName}
          size="lg"
          className="mb-4"
        />
        <h1 className="text-2xl font-bold mb-1">{user.displayName}</h1>
        <p className="text-gray-500 flex items-center mb-4">@{user.username}</p>

        <Button fullWidth className="mb-3">
          Follow
        </Button>

        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-col items-center flex-1 border-r border-gray-200">
            <span className="font-bold">{user.followers}</span>
            <span className="text-sm text-gray-500">Followers</span>
          </div>
          <div className="flex flex-col items-center flex-1">
            <span className="font-bold">{user.following}</span>
            <span className="text-sm text-gray-500">Following</span>
          </div>
        </div>

        <div className="flex items-center space-x-2 mb-4 text-gray-600 text-sm">
          <button className="px-3 py-1.5 border border-gray-200 rounded-lg flex items-center gap-1.5 hover:bg-gray-50 transition-colors">
            <CopyIcon size={14} />
            <span>{user.id.substring(0, 8)}</span>
          </button>
          <button className="p-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <GlobeIcon size={14} />
          </button>
          <button className="p-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <GiftIcon size={14} />
            <span className="sr-only">Tip creator</span>
          </button>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">About</h2>
        <p className="text-gray-600">{user.bio}</p>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Statistics</h2>
          <button
            className="text-gray-400 hover:text-gray-600"
            onClick={() => setShowDetail(!showDetail)}
          >
            +
          </button>
        </div>
        <div className="h-px bg-gray-200 my-4"></div>
        {showDetail && (
          <div className="w-full h-[500px]">
            <div>AAAAAAAAAA</div>
            <div>AAAAAAAAAA</div>
            <div>AAAAAAAAAA</div>
            <div>AAAAAAAAAA</div>
            <div>AAAAAAAAAA</div>
            <div>AAAAAAAAAA</div>
            <div>AAAAAAAAAA</div>
            <div>AAAAAAAAAA</div>
          </div>
        )}
      </div>
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Statistics</h2>
          <button className="text-gray-400 hover:text-gray-600">+</button>
        </div>
        <div className="h-px bg-gray-200 my-4"></div>
      </div>
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Statistics</h2>
          <button className="text-gray-400 hover:text-gray-600">+</button>
        </div>
        <div className="h-px bg-gray-200 my-4"></div>
      </div>
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Statistics</h2>
          <button className="text-gray-400 hover:text-gray-600">+</button>
        </div>
        <div className="h-px bg-gray-200 my-4"></div>
      </div>
    </div>
  );
};

export default UserInfoSidebar;
