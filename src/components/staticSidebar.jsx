import { Link } from 'react-router-dom'
import { classNames } from '../utils/index'
import { useLocation } from "react-router-dom"


export default function StaticSidebar({navigation}){
  const location = useLocation()
return (<div className="hidden md:flex md:flex-shrink-0">
<div className="flex flex-col w-48">
  <div className="flex flex-col h-0 flex-1 border-r border-gray-200 bg-white">
    <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
      <nav className="mt-5 flex-1 px-2 bg-white space-y-1">
        {navigation.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className={classNames(
              location?.pathname == item.href ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
              'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
            )}
          >
            <item.icon
              className={classNames(
                item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                'mr-3 flex-shrink-0 h-6 w-6'
              )}
              aria-hidden="true"
            />
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  </div>
</div>
</div>)
}
