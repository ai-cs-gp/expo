import React, { createContext, useContext } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type UserContextProps = {};
// {
//   agent ?: Agent | undefined;
//   signIn: (options: SignInAgentMutationOptions) => Promise<FetchResult<SignInAgentMutation>>;
//   signUp: (options: SignUpAgentMutationOptions) => Promise<FetchResult<SignUpAgentMutation>>;
//   signOut: () => void;
//   updateAgent: (
//     options: UpdateAgentMutationOptions,
//     updateCache?: boolean,
//   ) => Promise<FetchResult<UpdateAgentMutation>>;
//   startMission: (options: StartMissionMutationOptions) => Promise<FetchResult<StartMissionMutation>>;
//   saveTask: (options: SaveTaskMutationOptions) => Promise<FetchResult<SaveTaskMutation>>;
//   abortMission: (options?: AbortMissionMutationOptions) => Promise<FetchResult<AbortMissionMutation>>;
//   finishMission: (options?: FinishMissionMutationOptions) => Promise<FetchResult<FinishMissionMutation>>;
//   expireCurrentMission: () => void;
//   saveTaskLoading: boolean;
//   currentMission ?: MissionRun | undefined;
//   loading: boolean;
//   updateAgentCache: (agent: Agent, updateApollo?: boolean, redirect?: boolean) => void;
//   refetchAgent: () => void;
//   handleAgentRedirection: () => void;
// };

export const UserContext = createContext<UserContextProps | null>(null);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within a UserProvider');
  return context;
};

type Props = {
  children: React.ReactNode;
};

export const UserProvider = ({ children }: Props) => {
  // const updateAgentCache = useCallback(
  //   (agent?: Agent, updateApollo = true, redirect = true) => {
  //     if (!agent) return;
  //     // console.log('updateAgent', agent);
  //     setAgent(agent);
  //     // console.log('update current mission to', agent.currentMission ?? 'undefined');
  //     console.log('is active mission', agent.hasActiveMission, !!agent.currentMission);
  //     setCurrentMission(agent.currentMission ?? undefined);
  //     if (agent.token) mmkStorage.set('token', agent.token);
  //     if (updateApollo) apolloClient.writeQuery({ query: AgentDocument, data: { agent } });
  //     if (redirect) handleAgentRedirection(agent);
  //   },
  //   [router],
  // );

  // const handleAgentRedirection = useCallback(
  //   (initialAgent: Agent | undefined = agent) => {
  //     const isFirstUse = mmkStorage.getString('firstUse') !== 'false';
  //     // if agent is not login in
  //     if (!initialAgent) {
  //       // if agent is first time using the app, redirect to onboarding.
  //       if (isFirstUse) {
  //         console.log('Detected first time using the application, redirecting to onboarding tutorial screen.');
  //         router.replace('/auth/onboarding');
  //       }
  //       // if agent has used the app before, redirect to login.
  //       else router.replace('/auth');
  //     }
  //     // if agent is logged in, and is not completed quiz, redirect to quiz
  //     else if (!initialAgent?.isQuizCompleted) router.replace('/auth/quiz');
  //     // if agent is logged in, and is not completed necessary attachments, redirect to attachments upload
  //     else if (!initialAgent?.isNecessaryAttachmentsCompleted) router.replace('/auth/attachments-upload');
  //     // if agent is logged in, and is not completed tos, redirect to tos
  //     else if (!initialAgent?.isTosAccepted) router.replace('/auth/contract');
  //     // if agent is logged in, and has accepted tos, and is not verified, redirect to pending verification
  //     else if (!initialAgent?.isVerified) router.replace('/auth/pending-verification');
  //     // if agent is logged in, and has accepted tos, redirect to home
  //     else if (initialAgent?.hasActiveMission) router.replace(`/missions/${initialAgent.currentMission?.id}`);
  //     else router.replace('/');
  //   },
  //   [router, agent],
  // );

  // const [signInMutation, { loading: signInLoading }] = useSignInAgentMutation();
  // const signIn = useCallback(
  //   async (options: SignInAgentMutationOptions) =>
  //     signInMutation({
  //       ...options,
  //       onCompleted: (data) => {
  //         updateAgentCache(data.signInAgent as Agent, true, true);
  //         options.onCompleted?.(data);
  //       },
  //     }),
  //   [signInMutation, updateAgentCache],
  // );

  // const [signUpMutation, { loading: signUpLoading }] = useSignUpAgentMutation();
  // const signUp = useCallback(
  //   async (options: SignUpAgentMutationOptions) =>
  //     signUpMutation({
  //       ...options,
  //       onCompleted: (data) => {
  //         updateAgentCache(data.signUpAgent as Agent, true, false);
  //         options.onCompleted?.(data);
  //       },
  //     }),
  //   [signUpMutation, updateAgentCache],
  // );

  // const [updateAgentMutation, { loading: updateAgentLoading }] = useUpdateAgentMutation();
  // const updateAgent = useCallback(
  //   async (options: UpdateAgentMutationOptions, updateCache = true) =>
  //     updateAgentMutation({
  //       ...options,
  //       onCompleted: (data) => {
  //         if (updateCache) updateAgentCache(data.updateAgent as Agent, true, true);
  //         options.onCompleted?.(data);
  //       },
  //     }),
  //   [updateAgentMutation, updateAgentCache],
  // );

  // const signOut = useCallback(() => {
  //   apolloClient.clearStore();
  //   mmkStorage.delete('token');
  //   mmkStorage.delete('location.latitude');
  //   mmkStorage.delete('location.longitude');
  //   router.push('/(public)/auth');
  //   Toast.show({
  //     type: 'success',
  //     text1: 'Logged out successfully',
  //   });
  // }, [router]);

  // // auto redirect to auth if user is not logged in
  // useEffect(() => {
  //   console.log(mmkStorage.getString('token'));
  //   if (!agent) handleAgentRedirection();
  // }, [agent, router]);

  // const loading = [
  //   agentLoading,
  //   signInLoading,
  //   signUpLoading,
  //   updateAgentLoading,
  // ].some(Boolean);

  // const values = useMemo(
  //   () => ({
  //     agent,
  //     signIn,
  //     signUp,
  //     signOut,
  //     updateAgent,
  //     loading,
  //     refetchAgent,
  //     updateAgentCache,
  //     handleAgentRedirection,
  //   }),
  //   [
  //     agent,
  //     signIn,
  //     signUp,
  //     signOut,
  //     updateAgent,
  //     loading,
  //     refetchAgent,
  //     updateAgentCache,
  //     handleAgentRedirection,
  //   ],
  // );

  return <UserContext.Provider value={{}}>{children}</UserContext.Provider>;
};
