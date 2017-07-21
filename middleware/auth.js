export default function ({ store, redirect, error }) {
  // If user not connected, redirect to /
  if (!store.state.authUser) {
  return redirect('/');
  }
}
