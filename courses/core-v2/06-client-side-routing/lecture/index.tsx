import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route, Redirect, NavLink, Link, useParams } from 'react-router-dom'
import { Logo } from 'ProjectPlanner/Logo'
import { PrimaryFooter } from 'ProjectPlanner/PrimaryFooter'
import { Centered } from 'ProjectPlanner/Centered'
import { BsKanban } from 'react-icons/bs'
import { Heading } from 'ProjectPlanner/Heading'
import { useBoards } from 'ProjectPlanner/hooks/dataHooks'
import { Avatar } from 'ProjectPlanner/Avatar'
import 'ProjectPlanner/styles/global-styles.scss'
import 'ProjectPlanner/PrimaryLayout.scss'
import 'ProjectPlanner/BrowseBoardItem.scss'
import 'ProjectPlanner/PrimaryHeader.scss'

// https://reactjs.org/docs/code-splitting.html#route-based-code-splitting
// Lazy load this component and demonstrate suspense
import { UserProfile } from './UserProfile'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <PrimaryLayout />
    </BrowserRouter>
  )
}

const PrimaryLayout: React.FC = () => {
  return (
    <div className="primary-layout">
      <PrimaryHeader />
      <main className="primary-content">
        <Dashboard />
      </main>
      <PrimaryFooter />
    </div>
  )
}

const PrimaryHeader: React.FC = () => {
  return (
    <header className="primary-header spacing">
      <div className="flex-split">
        <div>
          <Logo />
        </div>
        <div>
          <nav className="horizontal-spacing-large">
            <NavLink to="/" exact className="primary-nav-item">
              Dashboard
            </NavLink>
            <NavLink to="/boards" className="primary-nav-item">
              Boards
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  )
}

const Dashboard: React.FC = () => {
  return (
    <Centered size={50}>
      <Heading>Welcome to your Dashboard</Heading>
    </Centered>
  )
}

const BrowseBoards: React.FC = () => {
  const boards = useBoards()

  return (
    <Centered size={50}>
      <Heading>Boards</Heading>

      <div className="spacing">
        {boards &&
          boards.map((board) => {
            return (
              <div key={board.id} className="browse-board-item flex items-center">
                <div className=" mr-4" style={{ fontSize: '2rem' }}>
                  <BsKanban className="block" color="#696ad8" />
                </div>
                <div className="spacing-small flex-1">
                  <Heading>
                    <Link to={`/boards/${board.id}`}>{board.name || <em>Board Name</em>}</Link>
                  </Heading>
                </div>
              </div>
            )
          })}
        <div className="vertical-middle">
          <Avatar src="/images/bruce-lee.jpg" size={2} />
          <Link to="/users/3" className="ml-3">
            Bruce Lee
          </Link>
        </div>
      </div>
    </Centered>
  )
}

type ParamsType = {
  boardId: string
}

const Board: React.FC = () => {
  const { boardId } = useParams<ParamsType>()

  return (
    <Centered size={50}>
      <Heading>👋 Hi from board {boardId}</Heading>
    </Centered>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
