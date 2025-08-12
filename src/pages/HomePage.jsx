import heroImg from "../assets/gamification.png";

function HomePage() {
  return (
    <>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          {/* Right side - PNG placeholder */}
          <img
            src={heroImg}
            alt="Hero Illustration"
            className="max-w-sm rounded-lg"
          />

          {/* Left side - Text & Buttons */}
          <div>
            <h1 className="text-5xl font-bold">Your Hero Title</h1>
            <p className="py-6">
              This is where your description goes. You can describe your
              product, service, or anything you want to highlight.
            </p>
            <div className="flex gap-4">
              <button className="btn btn-primary">Get Started</button>
              <button className="btn btn-secondary">Learn More</button>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-base-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            What Can This App Do?
          </h2>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="card bg-base-200 shadow-xl">
              <div className="card-body items-center text-center">
                <div className="text-primary text-5xl mb-4">🚀</div>
                <h3 className="card-title">Fast & Responsive</h3>
                <p>
                  Enjoy lightning-fast performance and smooth interactions on
                  any device.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="card bg-base-200 shadow-xl">
              <div className="card-body items-center text-center">
                <div className="text-primary text-5xl mb-4">🔒</div>
                <h3 className="card-title">Secure</h3>
                <p>
                  Your data is protected with industry-standard encryption and
                  privacy measures.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="card bg-base-200 shadow-xl">
              <div className="card-body items-center text-center">
                <div className="text-primary text-5xl mb-4">⚙️</div>
                <h3 className="card-title">Customizable</h3>
                <p>
                  Tailor the experience to your needs with flexible settings and
                  options.
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="card bg-base-200 shadow-xl">
              <div className="card-body items-center text-center">
                <div className="text-primary text-5xl mb-4">🌍</div>
                <h3 className="card-title">Global Access</h3>
                <p>
                  Use the app anywhere in the world with reliable global
                  connectivity.
                </p>
              </div>
            </div>

            {/* Feature 5 */}
            <div className="card bg-base-200 shadow-xl">
              <div className="card-body items-center text-center">
                <div className="text-primary text-5xl mb-4">📊</div>
                <h3 className="card-title">Analytics</h3>
                <p>
                  Get detailed insights into your usage and performance metrics.
                </p>
              </div>
            </div>

            {/* Feature 6 */}
            <div className="card bg-base-200 shadow-xl">
              <div className="card-body items-center text-center">
                <div className="text-primary text-5xl mb-4">🤝</div>
                <h3 className="card-title">Collaboration</h3>
                <p>Work seamlessly with others in real-time from anywhere.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
