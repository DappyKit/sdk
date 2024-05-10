const wallet = window.DappyKit.Wallet.createRandom()
const mnemonic = wallet.mnemonic.phrase
const optimismMainnetConfig = window.DappyKit.Config.optimismMainnetConfig

// example how to create SDK instance with mnemonic
const sdkMainnet = new window.DappyKit.SDK(optimismMainnetConfig, mnemonic)

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

  const delegatedWallet = window.DappyKit.Wallet.createRandom()
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
  setOutput(
    JSON.stringify(await sdkMainnet.farcasterClient.getAuthProofByAddress(getUserAddress(), getApplicationAddress())),
  )
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
