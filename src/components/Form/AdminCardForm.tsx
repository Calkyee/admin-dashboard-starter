import React, { useEffect, useState } from 'react';
import { UserSchema } from '@/zod';
import { z } from 'zod';
import { setMaxIdleHTTPParsers } from 'http';

type userType = z.infer<typeof UserSchema>;

const UserInputSchema = UserSchema.pick({ 
  name: true, 
  email: true, 
  passwordHash: true
})

const AdminForm = ({ admin, onChange }: { admin: userType, onChange: (a: userType) => void }) => {
  const [email, setEmail] = useState(admin.email); 
  const [name, setName] = useState(admin.name); 
  const [password, setPassword] = useState(admin.passwordHash); 
  useEffect(()=>{
    setEmail(admin.email); 
    setName(admin.name); 
    setPassword(admin.passwordHash); 
  }, [admin])

  const handleBlur = () => {
    const validatedData = UserInputSchema.safeParse({ 
      name, 
      email, 
      passwordHash: password
    }); 
    if(!validatedData.success){
      console.error(validatedData.error); 
      return; 
    }; 
    onChange({
      ...admin,
      ...validatedData.data
    });
  };

  const [editingField, setEditingField] = useState<{
    adminId: string;
    field: 'name' | 'email' | 'password';
  } | null>(null);

  const LabelClassNames = `ml-4`;
  const h2ClassNames = `border border-black rounded-2xl p-2 font-bold whitespace-normal break-words`;
  const divClassNames = `flex flex-col w-full`;

  return (
    <form>
      <div>
        <label className={LabelClassNames}>Id</label>
        <h2 className={h2ClassNames}>{admin.id}</h2>
      </div>
      {/* Email Field */}
      <div>
        {editingField?.adminId === admin.id && editingField.field === 'email' ? (
          <div className={divClassNames}>
            <label className={LabelClassNames}>Email</label>
            <input
              type="text"
              className={h2ClassNames}
              value={email}
              onChange={(e)=> 
                setEmail(e.target.value)
              }
              onBlur={handleBlur}
            />
          </div>
        ) : (
          <div className={divClassNames}>
            <label className={LabelClassNames}>Email</label>
            <h2
              className={h2ClassNames}
              onClick={() =>
                setEditingField({
                  adminId: admin.id,
                  field: 'email',
                })
              }
            >
              {email}
            </h2>
          </div>
        )}
      </div>
      {/* Name Field */}
      <div>
        {editingField?.adminId === admin.id && editingField.field === 'name' ? (
          <div className={divClassNames}>
            <label className={LabelClassNames}>Name</label>
            <input
              type="text"
              className={h2ClassNames}
              value={name}
              onChange={(e)=>
                setName(e.target.value)
              }
              onBlur={handleBlur}
            />
          </div>
        ) : (
          <div className={divClassNames}>
            <label className={LabelClassNames}>Name</label>
            <h2
              onClick={() =>
                setEditingField({
                  adminId: admin.id,
                  field: 'name',
                })
              }
              className={h2ClassNames}
            >
              {name}
            </h2>
          </div>
        )}
      </div>
      {/* Password Field */}
      <div>
        {editingField?.adminId === admin.id && editingField.field === 'password' ? (
          <div className={divClassNames}>
            <label className={LabelClassNames}>Password</label>
            <input
              type="text"
              className={h2ClassNames}
              value={password ?? ''}
              onChange={(e)=>setPassword(e.target.value)}
              onBlur={handleBlur}
            />
          </div>
        ) : (
          <div className={divClassNames}>
            <label className={LabelClassNames}>Password</label>
            <h2
              onClick={() => {
                setEditingField({
                  adminId: admin.id,
                  field: 'password',
                });
              }}
              className={h2ClassNames}
            >
              {password ?? ''}
            </h2>
          </div>
        )}
      </div>
    </form>
  );
};

export default AdminForm; 