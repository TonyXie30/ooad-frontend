import request from '@/utils/request'

export function leaveThisTeam(username) {
  return request({
    url: `http://localhost:8443/api/leaveTeam?username=${username}`,
    method: 'post'
  })
}

export function disbandThisTeam(leaderName) {
  return request({
    url: `http://localhost:8443/api/disbandTeam?leader_name=${leaderName}`,
    method: 'post'
  })
}

export function kickThisMember(leaderName, memberName) {
  return request({
    url: `http://localhost:8443/api/kickMember?leader_name=${leaderName}&username=${memberName}`,
    method: 'post'
  })
}

export function getTeamList(userName) {
  return request({
    url: `http://localhost:8443/api/getUsers?username=${userName}`,
    method: 'post'
  })
}

export function getTeamMember(userName) {
  return request({
    url: `http://localhost:8443/api/getTeam?username=${userName}`,
    method: 'post'
  })
}

export function requestTeamUp(leaderName, userName) {
  return request({
    url: `http://localhost:8443/api/requestTeamUp?leaderName=${leaderName}&username=${userName}`,
    method: 'post'
  })
}

export function teamUp(leaderName, userName) {
  return request({
    url: `http://localhost:8443/api/teamUp?memberName=${userName}&leaderName=${leaderName}`,
    method: 'post'
  })
}
