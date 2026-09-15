-- Allow admin users to delete client profiles from the admin panel
-- Without this policy, deleteClient() silently succeeded (no error) but deleted nothing
-- because RLS filtered the DELETE to 0 rows for authenticated non-service-role users.
CREATE POLICY "Admins delete any user_profile"
ON user_profiles
FOR DELETE
USING (
    EXISTS (
        SELECT 1 FROM user_profiles
        WHERE id = auth.uid() AND role = 'admin'
    )
);
