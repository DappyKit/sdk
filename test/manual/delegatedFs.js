const { mnemonicToAccount, generateMnemonic, english } = window.DappyKit.ViemUtils
const optimismMainnetConfig = window.DappyKit.Config.optimismMainnetConfig

function createRandomWallet() {
  return mnemonicToAccount(generateMnemonic(english))
}

// example how to create SDK instance with mnemonic
const sdkMainnet = new window.DappyKit.SDK(optimismMainnetConfig, generateMnemonic(english))

function getAuthServiceAddress() {
  const authServiceAddress = document.getElementById('authServiceAddress').value

  if (!authServiceAddress) {
    // eslint-disable-next-line no-alert
    alert('Please provide auth service address')

    return
  }

  return authServiceAddress
}

function getUserDelegatedSigner() {
  const userDelegatedSigner = document.getElementById('userDelegatedSigner').value

  if (!userDelegatedSigner) {
    // eslint-disable-next-line no-alert
    alert('Please provide user delegated signer')

    return
  }

  return userDelegatedSigner
}

function getApplicationAddress() {
  const applicationAddress = document.getElementById('applicationAddress').value

  if (!applicationAddress) {
    // eslint-disable-next-line no-alert
    alert('Please provide application address')

    return
  }

  return applicationAddress
}

function getTargetFid() {
  const targetFid = document.getElementById('targetFid').value

  if (!targetFid) {
    // eslint-disable-next-line no-alert
    alert('Please provide target fid')

    return
  }

  return targetFid
}

function getUserAddress() {
  const userAddress = document.getElementById('userAddress').value

  if (!userAddress) {
    // eslint-disable-next-line no-alert
    alert('Please provide user address')

    return
  }

  return userAddress
}

function getData() {
  const data = document.getElementById('data').value

  if (!data) {
    // eslint-disable-next-line no-alert
    alert('Please provide data')

    return
  }

  return data
}

function setOutput(text) {
  document.getElementById('output').innerHTML = `<code>${text}</code>`
}

function clearOutput() {
  setOutput('')
}

async function createAuthRequest() {
  clearOutput()
  const signer = document.getElementById('applicationSigner').value
  const messageBytesProof = document.getElementById('messageBytesProof').value

  if (!signer) {
    // eslint-disable-next-line no-alert
    alert('Please provide application signer')

    return
  }

  if (!messageBytesProof) {
    // eslint-disable-next-line no-alert
    alert('Please provide message bytes proof')

    return
  }

  const delegatedWallet = createRandomWallet()
  const applicationSigner = new window.DappyKit.Wallet(signer)
  let output = JSON.stringify(
    await sdkMainnet.farcasterClient.createAuthRequest(messageBytesProof, delegatedWallet.address, applicationSigner),
  )
  output += '\n' + delegatedWallet.address + ' - ' + delegatedWallet.privateKey
  setOutput(output)
}

async function isAuthorized() {
  clearOutput()
  setOutput((await sdkMainnet.farcasterClient.isFidAuthorized(getTargetFid(), getApplicationAddress())).toString())
}

async function getDataByAddress() {
  clearOutput()
  setOutput(await sdkMainnet.farcasterClient.getDataByAddress(getUserAddress(), getApplicationAddress()))
}

async function getAuthProofByAddress() {
  clearOutput()

  const proofData = await sdkMainnet.farcasterClient.getAuthProofByAddress(getUserAddress(), getApplicationAddress())
  try {
    await sdkMainnet.farcasterClient.checkCallbackData(
      {
        userMainAddress: proofData.userMainAddress,
        userDelegatedAddress: proofData.userDelegatedAddress,
        applicationAddress: proofData.applicationAddress,
        proof: proofData.authServiceProof,
      },
      getApplicationAddress(),
      getAuthServiceAddress(),
    )
  } catch (e) {
    // eslint-disable-next-line no-alert
    alert(`Incorrect callback data: ${e.message}`)
  }

  setOutput(JSON.stringify(proofData))
}

async function setDataByAddress() {
  clearOutput()
  const proofResponse = await sdkMainnet.farcasterClient.getAuthProofByAddress(
    getUserAddress(),
    getApplicationAddress(),
  )
  setOutput(
    JSON.stringify(proofResponse) +
      '\n\n' +
      JSON.stringify(
        await sdkMainnet.farcasterClient.saveUserAppData(
          getUserAddress(),
          getApplicationAddress(),
          getData(),
          proofResponse.authServiceProof,
          new window.DappyKit.Wallet(getUserDelegatedSigner()),
        ),
      ),
  )
}

async function getCustodyAddress() {
  try {
    const result = await sdkMainnet.farcasterClient.getCustodyAddress(getTargetFid())
    setOutput(`Custody Address: ${result}`)
  } catch (error) {
    setOutput('Error calling contract:' + JSON.stringify(error))
  }
}
