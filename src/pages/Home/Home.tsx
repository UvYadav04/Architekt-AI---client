import Header from './components/Navbar'
import Hero from './components/Hero'
import Feature1 from './components/Features1'
import Feature2 from './components/Feature2'

function Home() {
  return (
      <div className='w-full h-full relative overflow-x-hidden' style={{scrollbarWidth:"none"}} >

          <Header />
          <Hero />
          <Feature1/>
          <Feature2/>
    </div>
  )
}

export default Home
