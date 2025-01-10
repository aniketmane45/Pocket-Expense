import axios from 'axios'
import { format, parse } from 'date-fns'
import React, { useEffect, useState } from 'react'

const Dashboard = () => {
  const [userData, setUserData] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await axios.get(
          `http://localhost:8080/userDetail/${localStorage.getItem(
            'userToken'
          )}`
        )
        localStorage.setItem('userData', JSON.stringify(userData))
        setUserData(data.data)
      } catch (err) {
        alert(err)
      }
    }

    fetchData()
  }, [])

  const budget = userData.budgets ? userData.budgets[0] : {}

  const dateFormat = strdate => {
    const dateStr = strdate
    const date = new Date(dateStr)

    const formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long'
    })

    return formattedDate
  }

  return (
    <div className='min-h-screen py-6 px-4 sm:px-6 md:px-8 lg:px-10'>
      <h4 className='text-2xl font-semibold mb-6 text-center sm:text-left text-white'>
        Dashboard
      </h4>

      {/* Overview Summary */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8'>
        <div className='bg-white shadow-xl rounded-lg p-6 flex flex-col items-center transition-transform transform hover:scale-105 hover:shadow-2xl'>
          <h6 className='text-gray-600 text-lg'>Total Budget</h6>
          <p className='text-3xl font-semibold text-blue-600'>
            ₹{budget.monthlyBudget}
          </p>
        </div>
        <div className='bg-white shadow-xl rounded-lg p-6 flex flex-col items-center transition-transform transform hover:scale-105 hover:shadow-2xl'>
          <h6 className='text-gray-600 text-lg'>Total Expenses</h6>
          <p className='text-3xl font-semibold text-red-600'>
            ₹{budget.monthlyBudget - budget.currentBalance}
          </p>
        </div>
        <div className='bg-white shadow-xl rounded-lg p-6 flex flex-col items-center transition-transform transform hover:scale-105 hover:shadow-2xl'>
          <h6 className='text-gray-600 text-lg'>Remaining Balance</h6>
          <p className='text-3xl font-semibold text-green-600'>
            ₹{budget.currentBalance}
          </p>
        </div>
      </div>

      {/* Expense Breakdown */}
      <div className='bg-white shadow-xl rounded-lg p-6 mb-8 transition-transform transform hover:scale-105 hover:shadow-2xl'>
        <h6 className='text-2xl font-semibold text-gray-800 mb-4'>
          Expense Breakdown
        </h6>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
          <div className='flex justify-between items-center'>
            <span className='text-gray-600 text-lg'>Food</span>
            <span className='text-2xl text-blue-600'>₹{budget.food}</span>
          </div>
          <div className='flex justify-between items-center'>
            <span className='text-gray-600 text-lg'>Transport</span>
            <span className='text-2xl text-blue-600'>₹{budget.travel}</span>
          </div>
          <div className='flex justify-between items-center'>
            <span className='text-gray-600 text-lg'>Bills</span>
            <span className='text-2xl text-blue-600'>₹{budget.bills}</span>
          </div>
          <div className='flex justify-between items-center'>
            <span className='text-gray-600 text-lg'>Entertainment</span>
            <span className='text-2xl text-blue-600'>
              ₹{budget.entertainment}
            </span>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className='bg-white shadow-xl rounded-lg p-6 mb-8 transition-transform transform hover:scale-105 hover:shadow-2xl'>
        <h6 className='text-2xl font-semibold text-gray-800 mb-4'>
          Recent Transactions
        </h6>
        <ul className='space-y-4'>
          {userData.expenses &&
            [...userData.expenses]
              .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort expenses by date in descending order
              .map((expense, index) => (
                <li
                  className='flex justify-between items-center bg-gray-100 rounded-lg p-3 transition-transform transform hover:scale-105 hover:shadow-md'
                  key={expense.expenseId}
                >
                  <div>
                    <span className='text-lg font-medium text-gray-800'>
                      {expense.description}{' '}
                      <span className='text-xs'>
                        {'('}
                        {new Date(expense.date).toLocaleDateString('en-IN')}
                        {')'}
                      </span>
                    </span>
                  </div>
                  <span className='text-2xl text-blue-600'>
                    ₹{expense.amount}
                  </span>
                </li>
              ))}
        </ul>
      </div>

      {/* Monthly Trends */}
      <div className='bg-white shadow-xl rounded-lg p-6 mb-8 transition-transform transform hover:scale-105 hover:shadow-2xl'>
        <h6 className='text-2xl font-semibold text-gray-800 mb-4'>
          Monthly Trends
        </h6>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          <div className='flex justify-between items-center'>
            <span className='text-gray-600 text-lg max-sm:text-sm'>
              {dateFormat(budget.date)}
            </span>
          </div>
          <div className='flex flex-col items-center'>
            <p className='text-2xl text-blue-600'>
              ₹{budget.monthlyBudget - budget.currentBalance}
            </p>
            <span className='text-sm text-gray-600'>Expenses</span>
          </div>
          <div className='flex flex-col items-center'>
            <p className='text-2xl text-green-600'>₹{budget.monthlyBudget}</p>
            <span className='text-sm text-gray-600'>Budget</span>
          </div>
        </div>
      </div>

      {/* Savings Tracker */}
      <div className='bg-white shadow-xl rounded-lg p-6 mb-8 transition-transform transform hover:scale-105 hover:shadow-2xl'>
        <h6 className='text-2xl font-semibold text-gray-800 mb-4'>
          Savings Tracker
        </h6>
        {userData.goals && userData.goals.length > 0 ? (
          userData.goals.map((goal, index) => (
            <div
              key={goal.id || index}
              className='flex justify-between items-center mb-4 p-4 bg-gray-100 rounded-lg transition-transform transform hover:scale-105 hover:shadow-lg'
            >
              <span className='text-gray-600 text-lg'>{goal.description}</span>
              <div className='flex flex-col items-center'>
                <p className='text-2xl text-blue-600'>₹{goal.amount}</p>
                <span className='text-sm text-gray-600'>Amount</span>
              </div>
              <div className='flex flex-col items-center'>
                <p
                  className={`text-2xl ${
                    goal.status === 'Incomplete'
                      ? 'text-red-600'
                      : 'text-green-600'
                  }`}
                >
                  {goal.status}
                </p>
                <span className='text-sm text-gray-600'>Status</span>
              </div>
            </div>
          ))
        ) : (
          <p className='text-gray-600 text-center'>No goals available.</p>
        )}
      </div>
    </div>
  )
}

export default Dashboard
