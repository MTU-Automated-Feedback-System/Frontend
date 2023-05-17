import React, { useState, useEffect, useContext } from 'react'

import * as cognito from '../Lib/cognito'

const defaultState = {
  sessionInfo: {},
  authStatus: "loading",
}

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthContext = React.createContext(defaultState)

export const AuthIsSignedIn = ({ children }) => {
  const { authStatus } = useContext(AuthContext)

  return <>{authStatus === "signedIn" ? children : null}</>
}

export const AuthIsNotSignedIn = ({ children }) => {
  const { authStatus } = useContext(AuthContext)

  return <>{authStatus === "signedOut" ? children : null}</>
}

const AuthProvider = ({ children }) => {
  const [authStatus, setAuthStatus] = useState("loading")
  const [sessionInfo, setSessionInfo] = useState({})
  const [attrInfo, setAttrInfo] = useState([])
  
  console.log("AuthProvider", authStatus, sessionInfo, attrInfo)

  useEffect(() => {
    async function getSessionInfo() {
      try {
        const session = await getSession()
        setSessionInfo({
          accessToken: session.accessToken.jwtToken,
          refreshToken: session.refreshToken.token,
        })
        window.localStorage.setItem('accessToken', `${session.accessToken.jwtToken}`)
        window.localStorage.setItem('refreshToken', `${session.refreshToken.token}`)
        await setAttribute({ Name: 'website', Value: 'https://afs.romainclemencon.com/' })
        const attr = await getAttributes()
        setAttrInfo(attr)
        setAuthStatus("signedIn")
      } catch (err) {
        setAuthStatus("signedOut")
      }
    }
    getSessionInfo()
  }, [setAuthStatus, authStatus])

  if (authStatus === "loading") {
    return null
  }

  async function signInWithEmail(username, password) {
    try {
      await cognito.signInWithEmail(username, password)
      setAuthStatus("signedIn")
    } catch (err) {
      setAuthStatus("signedOut")
      console.log(console.log(err))
      console.warn(err)
      throw err
    }
  }

  async function signUpWithEmail(username, email, password) {
    try {
      await cognito.signUpUserWithEmail(username, email, password)
    } catch (err) {
      throw err
    }
  }

  function signOut() {
    cognito.signOut()
    setAuthStatus("signedOut")
  }

  async function verifyCode(username, code) {
    try {
      await cognito.verifyCode(username, code)
    } catch (err) {
      throw err
    }
  }

  async function getSession() {
    try {
      const session = await cognito.getSession()
      return session
    } catch (err) {
      throw err
    }
  }

  async function getAttributes() {
    try {
      const attr = await cognito.getAttributes()
      return attr
    } catch (err) {
      throw err
    }
  }

  async function setAttribute(attr) {
    try {
      const res = await cognito.setAttribute(attr)
      return res
    } catch (err) {
      throw err
    }
  }

  async function sendCode(username) {
    try {
      await cognito.sendCode(username)
    } catch (err) {
      throw err
    }
  }

  async function forgotPassword(username, code, password) {
    try {
      await cognito.forgotPassword(username, code, password)
    } catch (err) {
      throw err
    }
  }

  async function changePassword(oldPassword, newPassword) {
    try {
      await cognito.changePassword(oldPassword, newPassword)
    } catch (err) {
      throw err
    }
  }

  const state = {
    authStatus,
    sessionInfo,
    attrInfo,
    signUpWithEmail,
    signInWithEmail,
    signOut,
    verifyCode,
    getSession,
    sendCode,
    forgotPassword,
    changePassword,
    getAttributes,
    setAttribute,
  }

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>
}

export default AuthProvider