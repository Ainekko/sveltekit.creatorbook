<script>
 
    import NavBar from '$lib/components/NavBar.svelte'
</script>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>QuantumChain - Unlock the Quantum Future</title>
    <style>
        /* Reset some default styles */
        body, h1, h2, p {
            margin: 0;
            padding: 0;
        }
        body {
            font-family: Arial, sans-serif;
            background-color: #000;
            color: #fff;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 40px;
        }
        .hero {
            text-align: center;
            padding: 80px 0;
        }
        .hero h1 {
            font-size: 36px;
            font-weight: bold;
            margin-bottom: 20px;
        }
        .hero p {
            font-size: 18px;
            opacity: 0.8;
        }
        .features {
            display: flex;
            justify-content: space-between;
            margin-top: 60px;
        }
        .feature {
            flex: 1;
            text-align: center;
            padding: 20px;
            height: 200px;
        }
        .feature img {
            max-width: 50px;
            margin-bottom: 20px;
        }
        .feature h2 {
            font-size: 20px;
            margin-bottom: 10px;
        }
        .feature p {
            font-size: 12px;
            opacity: 0.8;
        }
        .cta {
            text-align: center;
            margin-top: 60px;
        }
        .cta a {
            display: inline-block;
            padding: 10px 20px;
           
           
            font-weight: bold;
            text-decoration: none;
           
            transition: background-color 0.3s;
        }
        .cta a:hover {
            background-color: #ff4500;
        }
        .footer {
            text-align: center;
            margin-top: 40px;
            opacity: 0.6;
        }
    </style>
    <script src="https://cdn.lordicon.com/lordicon.js"></script>
    
</head>
<body>
  <nav>
    <NavBar />
  </nav>
    <div class="container m-0 relative">
      <div class="w-10 h-10 bg-transparent absolute border border-transparent border-b-zinc-800">

      </div>
        <div class="hero p-0 flex flex-col justify-around items-center m-0 relative ">

            <!-- <div class="w-10 h-10 bg-transparent absolute bottom-0 right-100 border border-transparent border-b-zinc-800"> -->

              <!-- </div> -->

            <h1 class="mb-28 text-9xl w-full h-full">Unlock the Quantum Future with <span class="bg-gradient-to-r from-violet-400 via-purple-100 to-violet-300  text-transparent bg-clip bg-clip-text">QuantumChain</span></h1>
            <p class="mb-10">Secure, Scalable, Quantum-Resistant Blockchain</p>

            <div class="w-full ">

            </div>

            <div class="w-10 h-10 bg-transparent absolute bottom-100 left-20 border border-transparent border-b-zinc-800">

            </div>
            <img class="h-20" src="https://rechatcreatorbook.s3.us-west-2.amazonaws.com/_0672bb34-af36-49fa-9a72-a075a851bc25.jpeg" alt="">
            <div class="p-3 w-full">
              <form on:submit={()=>{}} class="flex justify-center items-center">
                <div class="w-[300px] md:max-w-[600px] rounded-full flex bg-violet-200 items-center shadow-2xl shadow-violet-300/60">
                  <button class="w-full min-h-full px-6 py-4 bg-violet-200 rounded-full focus:outline-none text- text-sm font-semibold text-black" placeholder="Join the Quantum Revolution" >
                    Join the Quantum Revolution
                  </button>
                  <button type="submit" class="right-0 m-2 min-w-6 min-h-6 px-3 py-3 text-slate-950 hover:text-slate-300 rounded-full bg-zinc-900 flex flex-row justify-center items-center"  >
                    
                    <lord-icon
                        src="https://cdn.lordicon.com/whtfgdfm.json"
                        trigger="hover"
                        colors="primary:#ffffff"
                        style="width:15px;height:15px">
                    </lord-icon>
                    <!-- Replace with your SVG button icon -->
                    
                  </button>
                </div>
              </form>
            </div>
           
        </div>
        <div class="features flex flex-row justify-center items-center">
            <div class="feature bg-zinc-950 shadow-xl shadow-zinc-900">
                <img src="https://uploads-ssl.webflow.com/638ca0b6c42934441d908d49/65294c89ce2e4b9e38d0f9eb_Creatorbook%20logo%20black.png" alt="Quantum-Proof Security">
                <h2>Quantum-Proof Security</h2>
                <p>Our encryption withstands quantum attacks.</p>
            </div>
            <div class="feature">
                <img src="https://uploads-ssl.webflow.com/638ca0b6c42934441d908d49/65294c89ce2e4b9e38d0f9eb_Creatorbook%20logo%20black.png" alt="Quantum-Enhanced Consensus">
                <h2>Quantum-Enhanced Consensus</h2>
                <p>Fast, energy-efficient, and quantum-safe.</p>
            </div>
            <div class="feature">
                <img src="https://uploads-ssl.webflow.com/638ca0b6c42934441d908d49/65294c89ce2e4b9e38d0f9eb_Creatorbook%20logo%20black.png" alt="Tokenomics">
                <h2>Tokenomics</h2>
                <p>Stake, mine, and trade QCHAIN.</p>
            </div>
            <div class="feature">
                <img src="https://uploads-ssl.webflow.com/638ca0b6c42934441d908d49/65294c89ce2e4b9e38d0f9eb_Creatorbook%20logo%20black.png" alt="Quantum Smart Contracts">
                <h2>Quantum Smart Contracts</h2>
                <p>Program the future with QSCs.</p>
            </div>
        </div>
        
        <div class="footer">
            © 2024 QuantumChain. All rights reserved.
        </div>
    </div>
</body>
</html>
