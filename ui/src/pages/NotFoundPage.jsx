import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <div className='container main'>
        <div className="row mt-5">
            <div className="col-12">
                <h1>404 Not Found</h1>
                <p>The page does not exist.</p>
                <Link to='/' className='btn btn-sm primary-btn mt-3'>Go Back</Link>
            </div>
        </div>
    </div>
  )
}

export default NotFoundPage