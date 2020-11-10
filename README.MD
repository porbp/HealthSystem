# HealthSystem-COVID

The Proposed COVID-Predicting model system based Hyperleadge fabric Blockchain from IBM.

## Prerequisites :

1. Install VS code version 1.39 (Best)or greater https://code.visualstudio.com/download

2. Install Node.js version 8.XX or greater and Install NPM version 5.XX or greater http://nodejs.org/en/download/

## Setting Blockchain Network On Local With VS Code :

<strong>Step 1.</strong> Clone the repositories with Git clone or dowload as a zip file<br>

  <p><code>git clone https://github.com/porbp/HealthSystem.git</code></p>

<strong>Step 2.</strong> Run VS code and install IBM Blockchain extension VS code on VS code<br>

  2.1) Go to the Visual Studio Code extension marketplace page or search :
  
  https://marketplace.visualstudio.com/items?itemName=IBMBlockchain.ibm-blockchain-platform
 
  2.2) Click Install, then allow to open on VSCode
  <img width="1235" alt="Screen Shot 2563-11-10 at 16 01 41" src="https://user-images.githubusercontent.com/55483608/98629962-29d2fd00-236e-11eb-9fdd-f757dc975899.png">
  
  According to the IBM Blockchain Extionsion on VS code, All the prerequisites need to established for supporting and running this plugin for VS code. Difference OS required difference suporting requirements.[More Details](https://cloud.ibm.com/docs/blockchain/howto?topic=blockchain-develop-vscode)
  Click install on VScode and wait until it installed
![1](https://user-images.githubusercontent.com/55483608/98636499-167a5e80-237b-11eb-8bd6-881437aaa7fc.PNG)
  
  2.3) Install all prequisites for setting local IBM Blockchain environment, After installed all requirement Dependencies, restart again and click ckeck updates
  
 ![2](https://user-images.githubusercontent.com/55483608/98636506-19754f00-237b-11eb-8b99-6973f176043b.PNG)
 
 
### Important🚨, Please make sure, you are able to use the IBM Blockchain Extension for VS code before moving to next step.
  
## Import Smart contract and Start local IBM Blockchain :
  
### Click on the Square on the left side menu bar for accessing IBM Blockchain Platform.



1. Import smart contract by clicking on <strong>...</strong> under <strong>SMART CONTRACTS</strong> > Import a Packet > Browse > HealthSystem@30.0.0.cds > Select
  <img width="1121" alt="Screen Shot 2563-11-10 at 13 34 06" src="https://user-images.githubusercontent.com/55483608/98621723-0010da80-235c-11eb-83c8-68475a4366eb.png">
  
2. Under <strong>FABRIC ENVIRONMENTS</strong> click + Add local or remote environment > Create new from Template > 1 Org template(1 CA, 1 peer, 1 channel) > type “local” > enter. 
Then, wait until the local fabric environment started.
   <img width="1103" alt="Screen Shot 2563-11-10 at 13 34 39" src="https://user-images.githubusercontent.com/55483608/98620719-ec647480-2359-11eb-8221-be9ae9d98f07.png">
  
3. double click on <strong>local</strong> under <strong>FABRIC ENVIRONMENTS</strong> to run blockchain environment > under <strong>Installed</strong> > click + Install > choose "HealthSystem@30.0.0.cds". 
   <img width="1166" alt="Screen Shot 2563-11-10 at 13 35 28" src="https://user-images.githubusercontent.com/55483608/98620722-ecfd0b00-2359-11eb-898a-2aada6fea4ee.png">
 
4. Then, under <strong>Instantiated</strong> > click + Instantiate > and select the "HealthSystem@30.0.0.cds". Click enter until the smartcontract strating to instantiate.
   <img width="1168" alt="Screen Shot 2563-11-10 at 13 36 05" src="https://user-images.githubusercontent.com/55483608/98624162-53d1f280-2361-11eb-8f1e-b653c0a1dbed.png">
 
5. Under <strong>FABRIC GATEWAY</strong>  click Org1 > admin. 
   <img width="1152" alt="Screen Shot 2563-11-10 at 13 36 27" src="https://user-images.githubusercontent.com/55483608/98625186-41f14f00-2363-11eb-837e-59db01baef94.png">
   
   Click <strong>...</strong> > Export Connection Profile. Save this file to HealthSystem/gateway/local/fabric_connection.json.
   <img width="1148" alt="Screen Shot 2563-11-10 at 13 36 56" src="https://user-images.githubusercontent.com/55483608/98625204-46b60300-2363-11eb-95e0-b0bbf1f07353.png">
   

6. Under <strong>Fabric Wallets</strong> > right click on Org1 > Export Wallet. Save this folder to HealthSystem/gateway/local/gen_local_wallet
    <img width="1153" alt="Screen Shot 2563-11-10 at 13 37 26" src="https://user-images.githubusercontent.com/55483608/98625236-56354c00-2363-11eb-89bd-7870991b750b.png">
    
## Build and Run client application
1. Running Server: Navigate to HealthSystem/application/server 
Install : <code>npm install</code>
run : <code>ng serve</code>

2. Running Client: Navigate to HealthSystem/application/client 
Install : <code>npm install</code>
run : <code>node server.js</code>


3. Typing http://localhost:4200/login to view Website

## Test Scenario: Test first Covid reported in system

1. Login as Admin with <strong>UserId:</strong> admin <strong>Password:</strong> adminpw
<img width="1235" alt="Screen Shot 2563-11-10 at 15 13 48" src="https://user-images.githubusercontent.com/55483608/98627179-af06e380-2367-11eb-90ad-7eb46e684ee5.png">

2. Go to tab <strong>add EMRs</strong> > Choose File "Covid-data-test-for-EMR.csv" [Link to file](https://github.com/porbp/HealthSystem/blob/main/Covid-data-test-for-EMR.csv) > click Create.  
<img width="1235" alt="Screen Shot 2563-11-10 at 15 13 27" src="https://user-images.githubusercontent.com/55483608/98627184-b1693d80-2367-11eb-946e-f8a9e4c9c5ba.png">

Then, go to tab <strong>Add New User</strong> > create <strong>UserId:</strong> lab1 with <strong>UserType:</strong> lab.

3. Logout > Login as lab1 > select pt4 from the left panel. Add Lab result with casename <strong>COVID_19</strong> and click Update.
<img width="1235" alt="Screen Shot 2563-11-10 at 15 15 14" src="https://user-images.githubusercontent.com/55483608/98627195-b6c68800-2367-11eb-8af2-3173be9d7cf3.png">

4. The result of predicting other EMRs for the potential of having COVID_19.
<img width="1235" alt="Screen Shot 2563-11-10 at 15 15 33" src="https://user-images.githubusercontent.com/55483608/98627201-b9c17880-2367-11eb-820c-373563b4daf5.png">

## Related Links

https://github.com/mdcollab/covidclinicaldata

https://nodejs.org/en/docs/guides/getting-started-guide/

https://angular.io/cli/serve


