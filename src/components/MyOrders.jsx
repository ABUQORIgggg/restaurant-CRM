import OrdersCharts from './OrdersCharts'

const MyOrders = () => {
  return (
    <div className=" w-[83%] p-6 ">
      <div className="flex items-center justify-between mb-4 ">
        <h1 className="text-2xl font-semibold">Order</h1>
        <button className="btn btn-primary px-4 py-2 text-base">
          Create Order
        </button>
      </div>
      <div className="flex items-center justify-center bg-base-300 rounded-md  mt-8">
      <div className="stats shadow bg-base-300 rounded-md ">
  <div className="stat bg-base-300 w-[25%]">
    <div className="stat-figure text-secondary">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="inline-block h-8 w-8 stroke-current">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
    </div>
    <div className="stat-title">Downloads</div>
    <div className="stat-value">31K</div>
    <div className="stat-desc">Jan 1st - Feb 1st</div>
  </div>
  <div className="stat">
    <div className="stat-figure text-secondary">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="inline-block h-8 w-8 stroke-current">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
      </svg>
    </div>
    <div className="stat-title">New Users</div>
    <div className="stat-value">4,200</div>
    <div className="stat-desc">↗︎ 400 (22%)</div>
  </div>
  <div className="stat">
    <div className="stat-figure text-secondary">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="inline-block h-8 w-8 stroke-current">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
    </div>
    <div className="stat-title">Downloads</div>
    <div className="stat-value">31K</div>
    <div className="stat-desc">Jan 1st - Feb 1st</div>
  </div>
  <div className="stat">
    <div className="stat-figure text-secondary">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="inline-block h-8 w-8 stroke-current">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
      </svg>
    </div>
    <div className="stat-title">New Users</div>
    <div className="stat-value">4,200</div>
    <div className="stat-desc">↗︎ 400 (22%)</div>
  </div>
  <div className="stat">
    <div className="stat-figure text-secondary">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="inline-block h-8 w-8 stroke-current">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
      </svg>
    </div>
    <div className="stat-title">New Registers</div>
    <div className="stat-value">1,200</div>
    <div className="stat-desc">↘︎ 90 (14%)</div>
  </div>
</div>



      </div>
      <div className="mt-8 rounded-md">
        <OrdersCharts className=''/>
      </div>
      <div className="mb-4">
      
        <div className="overflow-x-auto bg-base-300 rounded-md p-5 mt-8">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-semibold">Order List</h1>
          <div className="join">
            <div>
              <div>
                <input
                  className="input input-bordered join-item"
                  placeholder="Search"
                />
              </div>
            </div>
            <select className="select select-bordered join-item">
              <option disabled selected>
                Filter
              </option>
              <option>Sci-fi</option>
              <option>Drama</option>
              <option>Action</option>
            </select>
            <div className="indicator">
              <button className="btn join-item">Search</button>
            </div>
          </div>
        </div>
          <table className="table w-full">
            {/* head */}
            <thead>
              <tr>
                <th className="p-2">
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <th className="p-2">Name</th>
                <th className="p-2">Job</th>
                <th className="p-2">Favorite Color</th>
                <th className="p-2"></th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              <tr>
                <th className="p-2">
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <td className="p-2">
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                          alt="Avatar"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">Hart Hagerty</div>
                      <div className="text-sm text-gray-500">United States</div>
                    </div>
                  </div>
                </td>
                <td className="p-2">
                  Zemlak, Daniel and Leannon
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    Desktop Support Technician
                  </span>
                </td>
                <td className="p-2">Purple</td>
                <th className="p-2">
                  <button className="btn btn-ghost btn-xs">Details</button>
                </th>
              </tr>
              {/* row 2 */}
              <tr>
                <th className="p-2">
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <td className="p-2">
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src="https://img.daisyui.com/images/profile/demo/3@94.webp"
                          alt="Avatar"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">Brice Swyre</div>
                      <div className="text-sm text-gray-500">China</div>
                    </div>
                  </div>
                </td>
                <td className="p-2">
                  Carroll Group
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    Tax Accountant
                  </span>
                </td>
                <td className="p-2">Red</td>
                <th className="p-2">
                  <button className="btn btn-ghost btn-xs">Details</button>
                </th>
              </tr>
              {/* row 3 */}
              <tr>
                <th className="p-2">
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <td className="p-2">
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src="https://img.daisyui.com/images/profile/demo/4@94.webp"
                          alt="Avatar"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">Marjy Ferencz</div>
                      <div className="text-sm text-gray-500">Russia</div>
                    </div>
                  </div>
                </td>
                <td className="p-2">
                  Rowe-Schoen
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    Office Assistant I
                  </span>
                </td>
                <td className="p-2">Crimson</td>
                <th className="p-2">
                  <button className="btn btn-ghost btn-xs">Details</button>
                </th>
              </tr>
              {/* row 4 */}
              <tr>
                <th className="p-2">
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <td className="p-2">
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src="https://img.daisyui.com/images/profile/demo/5@94.webp"
                          alt="Avatar"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">Yancy Tear</div>
                      <div className="text-sm text-gray-500">Brazil</div>
                    </div>
                  </div>
                </td>
                <td className="p-2">
                  Wyman-Ledner
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    Community Outreach Specialist
                  </span>
                </td>
                <td className="p-2">Indigo</td>
                <th className="p-2">
                  <button className="btn btn-ghost btn-xs">Details</button>
                </th>
              </tr>
            </tbody>
            {/* foot */}
            <tfoot>
              <tr>
                <th className="p-2"></th>
                <th className="p-2">Name</th>
                <th className="p-2">Job</th>
                <th className="p-2">Favorite Color</th>
                <th className="p-2"></th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};
export default MyOrders;
