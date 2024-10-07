"use client"

import './style.css';
import Image from 'next/image'
import UserStore from '@/stores/user'

export default function Profile(){

	const { getUser } = UserStore();

	const imageUrl = `http://127.0.0.1:8055/assets/`+getUser()['items']?.avatar

	const user = getUser()['items'];

    return(
		<>

		{/* {JSON.stringify(getUser()['items'], null, 2)} */}
			<div className="container">
				<div className="row gutters">
					<div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
						<div className="card h-100">
							<div className="card-body">
								<div className="account-settings">
									<div className="user-profile">
										<div className="user-avatar">
											{/* <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Maxwell Admin"> */}

											<Image
											alt='avatar image'
											width={50}
											height={50}
											src={imageUrl}
											
										/>
										</div>
										<h5 className="user-name">
											{user?.fname}&nbsp;{user?.lname}
										</h5>
										<h6 className="user-email">{user?.email}</h6>
									</div>
									<div className="about">
										<h5>About</h5>
										<p>{user?.description}</p>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
						<div className="card h-100">
							<div className="card-body">
								
								<div className="row gutters">
									<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
										<h6 className="mb-2 text-primary">Personal Details</h6>
									</div>
									<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">

									<div class="row">
										<div class="col-sm-3">
										<h6 class="mb-0">First name</h6>
										</div>
										<div class="col-sm-9 text-secondary">
											{user?.fname}
										</div>
									</div>

									</div>
									<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
									<div class="row">
										<div class="col-sm-3">
										<h6 class="mb-0">Last name</h6>
										</div>
										<div class="col-sm-9 text-secondary">
										{user?.lname}
										</div>
									</div>
									</div>
									<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
									<div class="row">
										<div class="col-sm-3">
										<h6 class="mb-0">Location</h6>
										</div>
										<div class="col-sm-9 text-secondary">
											{user?.location}
										</div>
									</div>
									</div>
									<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
										<div class="row">
											<div class="col-sm-3">
												<h6 class="mb-0">Title</h6>
											</div>
											<div class="col-sm-9 text-secondary">
												{user?.title}
											</div>
										</div>
									</div>
									<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
										<div class="row">
											<div class="col-sm-3">
												<h6 class="mb-0">Language</h6>
											</div>
											<div class="col-sm-9 text-secondary">
												{user?.language}
											</div>
										</div>
									</div>
									<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
										<div class="row">
											<div class="col-sm-3">
												<h6 class="mb-0">Status</h6>
											</div>
											<div class="col-sm-9 text-secondary">
												{user?.status}
											</div>
										</div>
									</div>
									<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
										<div class="row">
											<div class="col-sm-3">
												<h6 class="mb-0">Tags</h6>
											</div>
											<div class="col-sm-9 text-secondary">
												{JSON.stringify(user?.tags)}
											</div>
										</div>
									</div>
								</div>


								{/* <div className="row gutters">
									<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
										<h6 className="mt-3 mb-2 text-primary">Address</h6>
									</div>
									<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
									<div class="row">
										<div class="col-sm-3">
										<h6 class="mb-0">Full Name</h6>
										</div>
										<div class="col-sm-9 text-secondary">
										Kenneth Valdez
										</div>
									</div>
									</div>
									<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
									<div class="row">
										<div class="col-sm-3">
										<h6 class="mb-0">Full Name</h6>
										</div>
										<div class="col-sm-9 text-secondary">
										Kenneth Valdez
										</div>
									</div>
									</div>
									<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
									<div class="row">
										<div class="col-sm-3">
										<h6 class="mb-0">Full Name</h6>
										</div>
										<div class="col-sm-9 text-secondary">
										Kenneth Valdez
										</div>
									</div>
									</div>
									<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
									<div class="row">
										<div class="col-sm-3">
										<h6 class="mb-0">Full Name</h6>
										</div>
										<div class="col-sm-9 text-secondary">
										Kenneth Valdez
										</div>
									</div>
									</div>
								</div> */}


								{/* <div className="row gutters">
									<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
										<div className="text-right">
											<button type="button" id="submit" name="submit" className="btn btn-secondary">Cancel</button>
											<button type="button" id="submit" name="submit" className="btn btn-primary">Update</button>
										</div>
									</div>
								</div> */}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
    )
}