

export default function BodyIntro(){
    const flexStyle = "d-flex justify-content-center align-items-center"
    return<>
        <div className={`bodyIntro p-lg-3 p-md-4 p-sm-5 ${flexStyle} flex-column`}>
            <p className="mb-md-3 mb-sm-2 dummy">Hi there! Looking for a solution to hire right people!</p>
            <div className={`${flexStyle} c-slogan flex-lg-row flex-column`}><p className="mb-md-3 mb-sm-2">Enjoying Hiring with our</p> <span className="mb-md-3 mx-md-3 mb-sm-2 mx-sm-2 mb-2">ONE STOP SOLUTION</span> <p className="mb-sm-2 mb-md-3">for all your Hiring Needs</p></div>
            <div className={`${flexStyle} flex-sm-row flex-column`}>
                <p className="m-0 mr-4">Sign Up for your <mark>Free Trial!</mark></p>
                <button className="m-sm-0 m-3">Sign Up</button>
            </div>
        </div>
    </>
}